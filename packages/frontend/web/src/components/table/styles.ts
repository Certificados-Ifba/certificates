import SimpleBar from 'simplebar-react'
import styled from 'styled-components'

export const Container = styled.table`
  width: 100%;
  border-collapse: collapse;
  tr {
    height: 58px;
    border-bottom: 2px solid ${props => props.theme.colors.lightShade};
    th,
    td {
      padding: 0 30px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
    }
  }
  thead {
    tr {
      th {
        text-align: left;
      }
    }
  }
  tbody {
    tr:hover {
      background-color: ${props => props.theme.colors.lightShade};
    }
  }
`

export const ScrollWrapper = styled(SimpleBar)`
  width: 100%;
`
