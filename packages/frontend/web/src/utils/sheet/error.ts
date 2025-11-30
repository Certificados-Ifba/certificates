export class DataError<T> {
  public readonly data: T

  constructor(data: T) {
    this.data = data
  }
}
