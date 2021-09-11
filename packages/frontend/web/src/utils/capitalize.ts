const abbreviation = (value: string): boolean => /^([A-Z]\.)+$/.test(value)

const romanNumeral = (value: string): boolean =>
  /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(value)

const capitalize = (value: string): string => {
  const preposition = ['da', 'do', 'das', 'dos', 'a', 'e', 'de']
  if (!value) return ''
  return value
    .replace(/\s/g, ' ')
    .split(' ')
    .map(word => {
      if (abbreviation(word) || romanNumeral(word)) {
        return word
      }

      word = word.toLowerCase()
      if (preposition.includes(word)) {
        return word
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')
}

export default capitalize
