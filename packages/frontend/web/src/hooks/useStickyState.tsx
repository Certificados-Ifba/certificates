import { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useStickyState(defaultValue: any, key: string): any {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    const stickyValue = window.localStorage.getItem(key)

    if (stickyValue !== null) {
      setValue(JSON.parse(stickyValue))
    }
  }, [key])

  useEffect(() => {
    if (!value) {
      window.localStorage.removeItem(key)
    } else {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return [value, setValue]
}

export default useStickyState
