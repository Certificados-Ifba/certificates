import styled from 'styled-components'

export const SheetTableWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
`

export const SheetTable = styled.table`
  min-width: 500px;
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
  th,
  td {
    border: 1px solid ${props => props.theme.colors.medium};
  }
`
