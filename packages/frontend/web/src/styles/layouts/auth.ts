import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.light};
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`
