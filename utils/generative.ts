/**
 * Map values from one range to another
 *
 * mapValues(6, 0, 10, 0, 5); -> 3
 * (6 within the range of 0 and 10 has the same value as 3 within the range of 0 and 5)
 * @param currentValue
 * @param sourceMinimum
 * @param sourceMaximum
 * @param targetMinimum
 * @param targetMaximum
 * @returns
 */
export function mapValues(
  currentValue: number,
  sourceMinimum: number,
  sourceMaximum: number,
  targetMinimum: number,
  targetMaximum: number
) {
  return (
    ((currentValue - sourceMinimum) / (sourceMaximum - sourceMinimum)) *
      (targetMaximum - targetMinimum) +
    targetMinimum
  );
}
