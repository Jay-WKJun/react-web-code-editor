class Histroy {
  history: string[];
  index: number;
  timeout: ReturnType<typeof setTimeout> | null;

  constructor() {
    this.history = [''];
    this.index = 0;
    this.timeout = null;
  }

  push(currentText: string) {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    this.timeout = setTimeout(() => {
      if (this.index === 29) {
        this.history = this.history.slice(1, this.index + 1);
        this.index -= 1;
      } else {
        this.history = this.history.slice(0, this.index + 1);
      }
      this.history.push(currentText);
      this.index += 1;
      this.timeout = null;
    }, 200);
  }

  goBack(): string {
    if (this.index <= 0) return this.history[0];

    this.index -= 1;
    return this.history[this.index] as string;
  }

  goForward(): string {
    const lastHistory = this.history.length - 1;
    if (this.index === lastHistory) return this.history[lastHistory];

    this.index += 1;
    return this.history[this.index];
  }
}

export default new Histroy();
