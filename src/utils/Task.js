class Task {
  constructor(designator) {
    this.designator = designator;
    this.ci = "";
    this.pi = "";
    this.di = "";
  }

  /**
   * Tests if all parameters of tasks are integers
   */
  isValid() {
    return Number.isInteger(parseInt(this.ci)) & Number.isInteger(parseInt(this.pi)) & Number.isInteger(parseInt(this.di));
  }

}

export default Task;
