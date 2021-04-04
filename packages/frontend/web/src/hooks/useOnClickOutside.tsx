import { ReactEventHandler, RefObject, useEffect } from 'react'

const useOnClickOutside = (
  ref: RefObject<any>,
  handler: ReactEventHandler
): void => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

export { useOnClickOutside }
