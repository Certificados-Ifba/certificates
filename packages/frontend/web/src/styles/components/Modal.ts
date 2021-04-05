import { transparentize } from 'polished'
import styled from 'styled-components'

interface ModalProps {
  size?: string
}

export const Container = styled.div<ModalProps>`
  .modal-container-div {
    ${props =>
      props.size === 'sm' && 'width:' + props.theme.modal.size.sm + ';'}
  }

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

  header {
    h2 {
      display: flex;
      svg {
        margin-top: auto;
        margin-bottom: auto;
        margin-right: 0.5rem;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 25px 30px;
    fieldset {
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
