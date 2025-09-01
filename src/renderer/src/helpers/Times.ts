export const convertMinuteToReader = (minutes: number): string => {
  if (!minutes || minutes <= 0) {
    return '0분';
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const parts = [] as string[];
  if (hours > 0) {
    parts.push(`${hours}시간`);
  }
  if (remainingMinutes > 0) {
    parts.push(`${remainingMinutes}분`);
  }
  return parts.join(' ');
};
