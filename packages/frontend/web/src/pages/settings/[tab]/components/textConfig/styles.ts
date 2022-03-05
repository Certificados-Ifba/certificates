import styled from 'styled-components'

export const Container = styled.div`
  padding: 25px;
  @media (max-width: ${props => props.theme.responsive.smDown}) {
    padding: 10px;
  }
`
