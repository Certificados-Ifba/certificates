import { InputHTMLAttributes, ReactNode } from 'react'

import { Container } from '../styles/components/Input'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
}

const Input: React.FC<InputProps> = ({ icon, ...rest }) => {
  return (
    <Container>
      {icon}
      <input {...rest} />
    </Container>
  )
}

export default Input
