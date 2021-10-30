const participant_key = 'participantToken'

export const saveToken: (token: string) => void = token => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(participant_key, token)
  }
}

export const getToken: () => string = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(participant_key)
    localStorage.removeItem(participant_key)
    return token
  }
  return null
}
