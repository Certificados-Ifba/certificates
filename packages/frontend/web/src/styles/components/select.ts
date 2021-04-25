import styled, { css } from 'styled-components'

interface Props {
  marginBottom?: string
  isErrored?: boolean
  hidden?: boolean
}

export const Container = styled.div<Props>`
  ${props => props.hidden && 'display: none;'}
  ${props =>
    props.marginBottom === 'sm' &&
    'margin-bottom:' + props.theme.margins.sm + ';'}
  ${props =>
    props.marginBottom === 'md' &&
    'margin-bottom:' + props.theme.margins.md + ';'}
${props =>
    props.marginBottom === 'lg' &&
    'margin-bottom:' + props.theme.margins.lg + ';'}
.select {
    ${props =>
      props.isErrored &&
      css`
        border-color: ${props => props.theme.colors.danger};
        color: ${props => props.theme.colors.danger};
      `}
  }
`
