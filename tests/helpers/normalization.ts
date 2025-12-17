export function normalizeValue(value: string | number): string | number {
  if (typeof value === 'number') return value

  const numeric = Number(value.replace(/[^0-9.-]+/g, ''))

  return isNaN(numeric) ? value : numeric
}