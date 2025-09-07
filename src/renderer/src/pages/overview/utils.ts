import { format, getYear } from 'date-fns';

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
 * Groups data by month and calculates count and total credit time
 * @param data Array of data with date and creditTime fields
 * @param dateField The field name containing the date
 * @returns Array of objects with month, count, and totalCreditTime
 */
export function groupByMonth<T>(
  data: T[],
  dateField: keyof T,
  creditTimeField: keyof T = 'creditTime' as keyof T
): { month: string; count: number; totalCreditTime: number }[] {
  const groupedData: Record<string, { count: number; totalCreditTime: number }> = {};

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

  return Object.entries(groupedData).map(([month, { count, totalCreditTime }]) => ({
    month,
    count,
    totalCreditTime,
  }));
}

/**
 * Groups data by year and calculates count and total credit time
 * @param data Array of data with date and creditTime fields
 * @param dateField The field name containing the date
 * @returns Array of objects with year, count, and totalCreditTime
 */
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
 * @param data Array of therapy data
 * @param dateField The field name containing the date
 * @returns Array of objects with month and time components
 */
export function groupTherapyTimesByMonth<T>(
  data: T[],
  dateField: keyof T
): { month: string; prepareTime: number; sessionTime: number; supervisionTime: number }[] {
  const groupedData: Record<string, { prepareTime: number; sessionTime: number; supervisionTime: number }> = {};

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

  return Object.entries(groupedData).map(([month, times]) => ({
    month,
    ...times,
  }));
}
