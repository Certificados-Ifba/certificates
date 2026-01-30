import styled from 'styled-components'

// Estilos do componente Select
export const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Badge = styled.span`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
`

export const IconArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`
