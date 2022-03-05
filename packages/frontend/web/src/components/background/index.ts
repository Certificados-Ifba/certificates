import { transparentize } from 'polished'
import styled from 'styled-components'

export const Background = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${props => transparentize(0.4, props.theme.colors.dark)};
  z-index: 1;
`
