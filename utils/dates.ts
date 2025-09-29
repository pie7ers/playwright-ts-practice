export function getCurrentDay(): number {
  const currentDay = new Date();
  return currentDay.getDate();
}