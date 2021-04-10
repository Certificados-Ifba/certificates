import Cookie from 'js-cookie'
import { useEffect, useState } from 'react'

function useStickyState(defaultValue: string, key: string): any {
  const [value, setValue] = useState(() => {
    const stickyValue = Cookie.get(key)

    return stickyValue || defaultValue
  })

  useEffect(() => {
    const stickyValue = Cookie.get(key)

    if (stickyValue) {
      setValue(stickyValue)
    }
  }, [key])

  useEffect(() => {
    if (!value) {
      Cookie.remove(key)
    } else {
      Cookie.set(key, value)
    }
  }, [key, value])

  return [value, setValue]
}

export default useStickyState
