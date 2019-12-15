/**
 * Computes the greatest common denominator of a and b
 */
function gcd(a, b) {
  while(b) {
    let new_a = b;
    b = a % b;
    a = new_a;
  }
  return a;
}

/**
 * Computes the least common multiple of a and b
 */
export function lcm(a, b) {
  return Math.floor((a * b) / gcd(a, b)) //TODO: Is flooring this correct??
}

/**
 * Computes the least common multiple from a given list of numbers
 */
export function lcm_from_list(num_list) {
  return num_list.reduce(lcm)
}
