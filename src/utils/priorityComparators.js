/**
 *  RMS priority sorting.  Highest Priority -> Least
 */
export function RMS_compare(a, b) {
  if (a.pi > b.pi) return 1;
  if (a.pi < b.pi) return -1;
  return 0;
}

/**
 *  EDF priority sorting.  Highest Priority -> Least
 */
export function EDF_compare(a, b) {
  if (a.di > b.di) return 1;
  if (a.di < b.di) return -1;
  return 0;
}
