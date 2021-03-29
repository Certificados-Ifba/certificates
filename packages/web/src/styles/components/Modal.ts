import { transparentize } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  display: none;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  &.show {
    display: flex !important;
  }
  form {
    display: flex;
    flex-direction: column;
    padding: 25px 30px;
    fieldset {
      margin-bottom: 16px;
      width: 100%;
    }
  }
`

export const CloseArea = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${props => transparentize(0.4, props.theme.colors.dark)};
  z-index: -1;
`
