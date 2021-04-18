const capitalize = (value: string): string => {
  const words = value.split(' ')
  for (let i = 0; i < words.length; i++) {
    if (words[i][0]) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase()
    }
  }
  return words.join(' ')
}

export default capitalize
