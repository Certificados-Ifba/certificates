import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`
