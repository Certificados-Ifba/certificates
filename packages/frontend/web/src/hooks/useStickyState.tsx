import Cookie from 'js-cookie'
import { useEffect, useState } from 'react'

function useStickyState(defaultValue: string, key: string): any {
  const [value, setValue] = useState(defaultValue)
  // const [value, setValue] = useState(() => {
  //   const stickyValue = window.localStorage.getItem(key)
  //   return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue
  // })

  useEffect(() => {
    const stickyValue = window.localStorage.getItem(key)
    console.log(stickyValue)

    if (stickyValue !== null) {
      setValue(JSON.parse(stickyValue))
    }
  }, [key])

  useEffect(() => {
    if (!value) {
      window.localStorage.removeItem(key)
    } else {
      window.localStorage.setItem(key, JSON.stringify(value))
      Cookie.set(key, value)
    }
  }, [key, value])

  return [value, setValue]
  useStickyState.get
}

export default useStickyState
