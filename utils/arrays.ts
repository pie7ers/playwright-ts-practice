export function toArray<T>(value?: T | T[]): T[] {
  if (Array.isArray(value)) return value.slice();
  if (value !== undefined) return [value];
  return [];
}