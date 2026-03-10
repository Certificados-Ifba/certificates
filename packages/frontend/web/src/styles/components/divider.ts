import styled from 'styled-components'

// Estilos do componente Divider
export const Divider = styled.hr`
  border: 0;
  border-top: 2px solid ${props => props.theme.colors.lightShade};
  margin: 20px 0;
`
