import { format, getYear, parse, addMonths, isBefore, isEqual } from 'date-fns';

/**
 * Groups age into categories (10대, 20대, etc.)
 * @param age The age to categorize
 * @returns The age category (e.g., "10대", "20대", etc.)
 */
export function getAgeGroup(age: number): string {
  const decade = Math.floor(age / 10) * 10;
  return `${decade}대`;
}

/**
 * Formats a date to YYYY-MM format
 * @param date The date to format
 * @returns Formatted date string
 */
export function formatYearMonth(date: Date): string {
  return format(date, 'yyyy-MM');
}

/**
 * Parses a YYYY-MM string to a Date object
 * @param yearMonth The YYYY-MM string to parse
 * @returns Date object set to the first day of the month
 */
export function parseYearMonth(yearMonth: string): Date {
  return parse(yearMonth, 'yyyy-MM', new Date());
}

export function groupByMonth<T>(
  data: T[],
  dateField: keyof T,
  creditTimeField: keyof T = 'creditTime' as keyof T,
  trainingYear?: { startDate: string; endDate: string }
): { month: string; count: number; totalCreditTime: number }[] {
  const groupedData: Record<string, { count: number; totalCreditTime: number }> = {};

  // First, collect data for months that have entries
  data.forEach((item) => {
    const date = item[dateField] as unknown as Date;
    if (!date) return;

    const month = formatYearMonth(date);
    const creditTime = (item[creditTimeField] as unknown as number) || 0;

    if (!groupedData[month]) {
      groupedData[month] = { count: 0, totalCreditTime: 0 };
    }

    groupedData[month].count += 1;
    groupedData[month].totalCreditTime += creditTime;
  });

  // Determine start and end dates for the range
  let startDate: Date;
  let endDate: Date;

  if (trainingYear) {
    // If training year is provided, use its start and end dates
    startDate = new Date(trainingYear.startDate);
    endDate = new Date(trainingYear.endDate);
  } else if (data.length > 0) {
    // Otherwise, find min and max dates from the data
    let minDate = new Date(8640000000000000); // Max date value
    let maxDate = new Date(-8640000000000000); // Min date value

    data.forEach(item => {
      const date = item[dateField] as unknown as Date;
      if (!date) return;

      if (date < minDate) minDate = new Date(date);
      if (date > maxDate) maxDate = new Date(date);
    });

    startDate = minDate;
    endDate = maxDate;
  } else {
    // If no data and no training year, return empty array
    return [];
  }

  // Generate entries for all months in the range
  const result: { month: string; count: number; totalCreditTime: number }[] = [];
  let currentDate = new Date(startDate);
  currentDate.setDate(1); // Set to first day of month

  while (isBefore(currentDate, endDate) || isEqual(currentDate, endDate)) {
    const monthStr = formatYearMonth(currentDate);

    // Use existing data if available, otherwise set to 0
    const monthData = groupedData[monthStr] || { count: 0, totalCreditTime: 0 };

    result.push({
      month: monthStr,
      count: monthData.count,
      totalCreditTime: monthData.totalCreditTime
    });

    // Move to next month
    currentDate = addMonths(currentDate, 1);
  }

  // Sort by month
  return result.sort((a, b) => {
    const dateA = parseYearMonth(a.month);
    const dateB = parseYearMonth(b.month);
    return dateA.getTime() - dateB.getTime();
  });
}

export function groupByYear<T>(
  data: T[],
  dateField: keyof T,
  creditTimeField: keyof T = 'creditTime' as keyof T
): { year: string; count: number; totalCreditTime: number }[] {
  const groupedData: Record<string, { count: number; totalCreditTime: number }> = {};

  data.forEach((item) => {
    const date = item[dateField] as unknown as Date;
    if (!date) return;

    const year = getYear(date).toString();
    const creditTime = (item[creditTimeField] as unknown as number) || 0;

    if (!groupedData[year]) {
      groupedData[year] = { count: 0, totalCreditTime: 0 };
    }

    groupedData[year].count += 1;
    groupedData[year].totalCreditTime += creditTime;
  });

  return Object.entries(groupedData).map(([year, { count, totalCreditTime }]) => ({
    year,
    count,
    totalCreditTime,
  }));
}

/**
 * Groups data by a specific field and calculates count and percentage
 * @param data Array of data
 * @param field The field to group by
 * @returns Array of objects with name, count, and percentage
 */
export function groupByField<T>(
  data: T[],
  field: keyof T
): { name: string; count: number; percentage: number }[] {
  const groupedData: Record<string, number> = {};
  const total = data.length;

  data.forEach((item) => {
    const value = String(item[field] || 'Unknown');

    if (!groupedData[value]) {
      groupedData[value] = 0;
    }

    groupedData[value] += 1;
  });

  return Object.entries(groupedData).map(([name, count]) => ({
    name,
    count,
    percentage: (count / total) * 100,
  }));
}

/**
 * Groups therapy data by month and calculates different time components
 * Ensures all months in the range are included, even those with no data
 * @param data Array of therapy data
 * @param dateField The field name containing the date
 * @param trainingYear Optional training year to determine date range
 * @returns Array of objects with month and time components
 */
export function groupTherapyTimesByMonth<T>(
  data: T[],
  dateField: keyof T,
  trainingYear?: { startDate: string; endDate: string }
): { month: string; prepareTime: number; sessionTime: number; supervisionTime: number }[] {
  const groupedData: Record<string, { prepareTime: number; sessionTime: number; supervisionTime: number }> = {};

  // First, collect data for months that have entries
  data.forEach((item) => {
    const date = item[dateField] as unknown as Date;
    if (!date) return;

    const month = formatYearMonth(date);
    const prepareTime = (item['prepareTime' as keyof T] as unknown as number) || 0;
    const sessionTime = (item['sessionTime' as keyof T] as unknown as number) || 0;
    const supervisionTime = (item['supervisionTime' as keyof T] as unknown as number) || 0;

    if (!groupedData[month]) {
      groupedData[month] = { prepareTime: 0, sessionTime: 0, supervisionTime: 0 };
    }

    groupedData[month].prepareTime += prepareTime;
    groupedData[month].sessionTime += sessionTime;
    groupedData[month].supervisionTime += supervisionTime;
  });

  // Determine start and end dates for the range
  let startDate: Date;
  let endDate: Date;

  if (trainingYear) {
    // If training year is provided, use its start and end dates
    startDate = new Date(trainingYear.startDate);
    endDate = new Date(trainingYear.endDate);
  } else if (data.length > 0) {
    // Otherwise, find min and max dates from the data
    let minDate = new Date(8640000000000000); // Max date value
    let maxDate = new Date(-8640000000000000); // Min date value

    data.forEach(item => {
      const date = item[dateField] as unknown as Date;
      if (!date) return;

      if (date < minDate) minDate = new Date(date);
      if (date > maxDate) maxDate = new Date(date);
    });

    startDate = minDate;
    endDate = maxDate;
  } else {
    // If no data and no training year, return empty array
    return [];
  }

  // Generate entries for all months in the range
  const result: { month: string; prepareTime: number; sessionTime: number; supervisionTime: number }[] = [];
  let currentDate = new Date(startDate);
  currentDate.setDate(1); // Set to first day of month

  while (isBefore(currentDate, endDate) || isEqual(currentDate, endDate)) {
    const monthStr = formatYearMonth(currentDate);

    // Use existing data if available, otherwise set to 0
    const monthData = groupedData[monthStr] || { prepareTime: 0, sessionTime: 0, supervisionTime: 0 };

    result.push({
      month: monthStr,
      prepareTime: monthData.prepareTime,
      sessionTime: monthData.sessionTime,
      supervisionTime: monthData.supervisionTime
    });

    // Move to next month
    currentDate = addMonths(currentDate, 1);
  }

  // Sort by month
  return result.sort((a, b) => {
    const dateA = parseYearMonth(a.month);
    const dateB = parseYearMonth(b.month);
    return dateA.getTime() - dateB.getTime();
  });
}
