import { normalizeValue } from "./normalization"

export type SortDirection = 'asc' | 'desc'

/** 
  to make more stricted the elements[], overload the method to avoid this scenario:
  sortElementsByDirecction([1, 2, 'Bach', 4, 5, 6, 7], 'desc') 

  spread the overload in the functions that call this one

  ```js
  export function sortElementsByDirecction(
    elements: string[],
    direction: SortDirection
  ): string[]

  export function sortElementsByDirecction(
    elements: number[],
    direction: SortDirection
  ): number[]
```
*/
export function sortElementsByDirecction<T extends string | number>(
  elements: T[],
  direction: SortDirection
) {
  return [...elements].sort((a, b) => {
    const valA = normalizeValue(a)
    const valB = normalizeValue(b)

    if (typeof valA === 'number' && typeof valB === 'number') {
      return direction === 'asc' ? valA - valB : valB - valA
    }

    return direction === 'asc'
      ? String(a).localeCompare(String(b))
      : String(b).localeCompare(String(a))
  }
  )
}