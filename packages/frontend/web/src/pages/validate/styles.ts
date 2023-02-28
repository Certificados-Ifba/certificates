import styled from 'styled-components'

export const TopButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  > div {
    display: -webkit-inline-box;
  }
  @media (max-width: ${props => props.theme.responsive.smDown}) {
    left: 10px;
    > div {
      display: flex;
      > * {
        flex: 1;
      }
    }
  }
`
