/**
 *  RMS priority sorting.  Highest Priority -> Least
 */
export function RMS_compare(a, b) {
  if (parseInt(a.pi) > parseInt(b.pi)) return 1;
  if (a.pi < b.pi) return -1;
  return 0;
}

/**
 *  EDF priority sorting.  Highest Priority -> Least
 */
export function EDF_compare(a, b) {
  if (parseInt(a.di) > parseInt(b.di)) return 1;
  if (parseInt(a.di) < parseInt(b.di)) return -1;
  return 0;
}
