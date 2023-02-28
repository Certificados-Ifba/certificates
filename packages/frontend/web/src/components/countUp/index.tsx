import { useEffect, useState } from 'react'

interface Props {
  end: number
  duration?: number
}

export const CountUp: React.FC<Props> = ({ end, duration = 2 }) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    for (let index = 0; index < end; index++) {
      setTimeout(
        value => setValue(value),
        (index * duration * 1000) / end,
        index
      )
    }
  }, [end, duration])

  return <>{value.toLocaleString()}</>
}
