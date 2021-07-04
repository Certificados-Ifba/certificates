import _ from 'lodash'

interface DebounceResp<T> {
  run?: (data: T) => void
}

const timeouts = {}
let lastID = 0

export function useDebounce<T>(
  callback: (data: T) => void,
  time?: number
): DebounceResp<T> {
  if (!time) time = 500
  const id = lastID + 1
  lastID = id
  const run: (data: T) => void = (data: T) => {
    const timeout = timeouts[id]
    if (timeout) clearTimeout(timeout)
    timeouts[id] = setTimeout(() => {
      callback(data)
      delete timeouts[id]
    }, time)
  }
  return { run }
}

// export const debouncedLoadOptions = (loadOptions: any, wait: number) =>
//   _.debounce(loadOptions, wait)
