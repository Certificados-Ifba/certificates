import styled, { css } from 'styled-components'

interface Props {
  reverse?: boolean
}

export const Row = styled.div<Props>`
  display: flex;
  justify-content: space-between;
  ${props =>
    props.reverse &&
    css`
      flex-direction: row-reverse;
    `}
  > * {
    flex: 1;
    margin-left: 8px;
    margin-right: 8px;
    &:first-child {
      ${props => (props.reverse ? 'margin-right' : 'margin-left:') + '0;'}
    }
    &:last-child {
      ${props => (props.reverse ? 'margin-left' : 'margin-right:') + '0;'}
    }
  }
`
