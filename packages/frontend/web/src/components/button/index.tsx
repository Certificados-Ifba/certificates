import { Spinner } from '@components'
import { theme } from '@styles'
import { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'info'
    | 'success'
    | 'warning'
    | 'dark'
    | 'medium'
    | 'light'
  size?: 'small' | 'default' | 'big'
  ghost?: boolean
  outline?: boolean
  inline?: boolean
  loading?: boolean | string
  square?: boolean
  link?: boolean
  marginBottom?: 'xs' | 'sm' | 'md' | 'lg'
}

export type { Props as ButtonProps }

export const Button: React.FC<Props> = ({ children, loading, ...rest }) => {
  return (
    <Container loading={String(loading)} {...rest}>
      {loading ? (
        <>
          <Spinner size={20} color={theme.colors.light} />
          <span>Carregando</span>
        </>
      ) : (
        children
      )}
    </Container>
  )
}
