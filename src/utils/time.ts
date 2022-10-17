/**
 * Append zeroes to time if needed
 * @param time Decimal time
 * @returns Formatted time
 */
export function formatTime(time: number) {
  const timeString = time.toString();
  return timeString.length > 1 ? timeString : '0' + timeString;
}