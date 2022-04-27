import format from "date-fns/format";

export function formatDateForChart(date: Date | string, dateFormat = 'hh:mm:ss/dd.MMM.yy'): string {
  return format(new Date(date), dateFormat);
}