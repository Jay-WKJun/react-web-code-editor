class Histroy {
  history: string[];
  index: number;
  timeout: ReturnType<typeof setTimeout> | null;

  constructor() {
    this.history = [];
    this.index = -1;
    this.timeout = null;
  }

  push(currentText: string) {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    this.timeout = setTimeout(() => {
      this.history = this.history.slice(0, this.index + 1);
      this.history.push(currentText);
      this.index += 1;
      this.timeout = null;
    }, 100);
  }

  goBack(): string {
    if (this.history.length <= 0) return '';

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
