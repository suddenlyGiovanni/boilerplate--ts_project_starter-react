type Lazy<T> = () => T
export function insertIf<T>(condition: boolean, ...elements: Lazy<T>[]): T[] {
  return condition ? elements.map(element => element()) : []
}
