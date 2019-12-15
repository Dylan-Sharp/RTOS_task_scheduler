export default class Task {
  constructor(idx) {
    this.idx = idx;  //Note this is idx that starts at 1 (not 0)
    this.ci = "";
    this.pi = "";
    this.di = "";
  }

  /**
   * Tests if all parameters of tasks are integers
   */
  isValid() {
    return Number.isInteger(parseInt(this.ci)) &&
    Number.isInteger(parseInt(this.pi)) &&
    Number.isInteger(parseInt(this.di)) &&
    parseInt(this.di) >= parseInt(this.pi);
  }

}
