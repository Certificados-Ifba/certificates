import styled from 'styled-components'

export interface TableProps {
  overflowY?: boolean
}

export const Container = styled.div<TableProps>`
  ${props => props.overflowY && 'overflow-y: auto;'}
`
