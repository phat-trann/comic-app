const formatView = (viewNumber: number, hideText: boolean = false) => {
  const formatViewNumber = new Intl.NumberFormat().format(viewNumber);
  if (hideText) return formatViewNumber;
  return `${new Intl.NumberFormat().format(viewNumber)} view${viewNumber > 1 ? 's' : ''}`;
};

const floorDateTime = (dateNumber: number, dateType: string) => {
  dateNumber = Math.floor(dateNumber);
  return `${dateNumber} ${dateType}${dateNumber > 1 ? 's' : ''} ago`;
};

const diffDate: (firstDate: number, secondDate: number) => string = (firstDate, secondDate) => {
  const firstDateConvert = new Date(firstDate);
  const secondDateConvert = new Date(secondDate);
  const diffInTime = secondDateConvert.getTime() - firstDateConvert.getTime();
  const minuteDiff = diffInTime / (1000 * 60);
  const hourDiff = diffInTime / (1000 * 3600);
  const dayDiff = hourDiff / 24;
  const monthDiff = dayDiff / 30;
  const yearDiff = dayDiff / 365;

  if (yearDiff > 1) return floorDateTime(yearDiff, 'year');
  if (monthDiff > 1) return floorDateTime(monthDiff, 'month');
  if (dayDiff > 1) return floorDateTime(dayDiff, 'day');
  if (hourDiff > 1) return floorDateTime(hourDiff, 'hour');

  return floorDateTime(minuteDiff, 'minute');
};

const changeWidthImageUrl = (currentUrl: string, width: number) => {
  const url = new URL(currentUrl);
  const searchParams = url.searchParams;

  searchParams.set('width', String(width));
  url.search = searchParams.toString();

  return url.toString();
};

const formatRating = (voteSum: number, voteCount: number) => {
  return Math.floor((voteSum / voteCount) * 10) / 10;
};

export { diffDate, formatView, changeWidthImageUrl, formatRating };
