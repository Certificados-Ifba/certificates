export const getInputDate: (date: Date) => string = (date: Date) => {
  if (date) {
    const day: string = date.getDate() + ''
    const month: string = date.getMonth() + ''
    const year: string = date.getFullYear() + ''
    return (
      year +
      '-' +
      (month.length === 1 ? '0' + month : month) +
      '-' +
      (day.length === 1 ? '0' + day : day)
    )
  }

  return null
}
