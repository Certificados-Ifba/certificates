import styled from 'styled-components'

export const LayoutContainer = styled.div`
  display: flex;
  overflow-x: auto;
`

export const EditContainer = styled.div`
  display: inline-table;
  width: 300px;
  margin-left: ${props => props.theme.margins.sm};
`
