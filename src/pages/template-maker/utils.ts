export function swap<T>(array: Array<T>, left: number, right: number) {
  [array[left], array[right]] = [array[right], array[left]];
}
