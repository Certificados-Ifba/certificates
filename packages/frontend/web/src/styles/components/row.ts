import styled, { css } from 'styled-components'

interface RowProps {
  reverse?: boolean
}

const Row = styled.div<RowProps>`
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

export default Row
