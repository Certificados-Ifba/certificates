import { forwardRef } from 'react'
import { FaSearch } from 'react-icons/fa'

import { Container } from './styles'

type Props = JSX.IntrinsicElements['input']

export const Search = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <Container>
      <div>
        <FaSearch size={20} />
      </div>
      <input
        ref={ref}
        onKeyDown={event => {
          if (event.key === 'Enter') event.preventDefault()
        }}
        {...props}
      />
    </Container>
  )
})
