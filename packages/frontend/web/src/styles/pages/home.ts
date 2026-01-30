import styled from 'styled-components'

export const TableRow = styled.tr`
  &:hover {
    background-color: ${props => props.theme.colors.lightShade};
  }

  td {
    padding: 15px;
    border-bottom: 1px solid ${props => props.theme.colors.lightTint};
  }
`
