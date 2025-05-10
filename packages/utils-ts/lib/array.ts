/**
 * Chunks an array into smaller arrays of a specified size
 * @param array - The array to chunk
 * @param size - The size of each chunk
 * @returns An array of chunks
 */
export function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length || size <= 0) return []
  
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  
  return result
}

/**
 * Removes duplicate values from an array
 * @param array - The array to deduplicate
 * @returns A new array with unique values
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}

/**
 * Groups an array of objects by a specified key
 * @param array - The array to group
 * @param key - The key to group by
 * @returns An object with groups
 */
export function groupBy<T extends Record<string, any>>(
  array: T[],
  key: keyof T
): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key])
    result[groupKey] = result[groupKey] || []
    result[groupKey].push(item)
    return result
  }, {} as Record<string, T[]>)
}