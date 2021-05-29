export class Debounce<T> {
  constructor(callback: (data: T) => void, time?: number) {
    this.callback = callback
    if (time) {
      this.time = time
    } else {
      this.time = 500
    }
  }

  private callback: (data: T) => void
  private time: number

  private timeout

  notify(data: T): void {
    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(async () => {
      this.callback(data)
    }, this.time)
  }
}
