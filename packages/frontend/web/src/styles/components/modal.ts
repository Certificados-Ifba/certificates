import { transparentize } from 'polished'
import styled, { css } from 'styled-components'

interface ModalProps {
  size?: 'sm'
  reverse?: boolean
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
  align-items: center;
  justify-content: center;
  margin: 0 30px;
  &.show {
    display: flex !important;
  }

  @media (min-width: ${props => props.theme.responsive.mdDown}) {
    bottom: 0;
  }

  @media (max-width: ${props => props.theme.responsive.mdDown}) {
    top: 110px;
  }

  header {
    h2 {
      display: flex;
      margin: 0 !important;
      svg {
        margin-top: auto;
        margin-bottom: auto;
        margin-right: 1rem;
      }
    }
    @media (max-width: ${props => props.theme.responsive.smDown}) {
      min-height: 60px;
    }
  }

  .modal-body {
    display: flex;
    flex-direction: column;
    padding: 25px 30px;
    fieldset {
      width: 100%;
    }

    max-height: 400px;
    overflow-y: auto;
  }

  .modal-footer {
    border-top: 2px solid ${props => props.theme.colors.lightShade};
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    ${props =>
      props.reverse &&
      css`
        flex-direction: row-reverse;
      `}
    > * {
      flex: 1;
      margin-left: 8px;
      margin-right: 8px;
      &:first-child {
        ${props => (props.reverse ? 'margin-right' : 'margin-left:') + '0;'}
      }
      &:last-child {
        ${props => (props.reverse ? 'margin-left' : 'margin-right:') + '0;'}
      }
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
