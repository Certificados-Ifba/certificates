import styled from 'styled-components'

export const Container = styled.div`
  font-size: 0.75rem;
  margin-top: 20px;
  text-align: center;
  a {
    color: ${props => props.theme.colors.primary};
  }
  a:hover {
    color: ${props => props.theme.colors.primaryShade};
  }
`
