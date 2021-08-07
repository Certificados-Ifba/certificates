import { transparentize } from 'polished'
import styled, { css } from 'styled-components'

interface ModalProps {
  size?: 'sm' | 'lg' | 'xl'
  reverse?: boolean
}

interface RowProps {
  cols: 2 | 3
}

export const Container = styled.div<ModalProps>`
  .modal-container-div {
    ${props =>
      props.size === 'sm' &&
      css`
        width: ${props.theme.modal.size[props.size]};
      `}
  }

  display: none;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  align-items: center;
  justify-content: center;
  margin: 0 30px;
  z-index: 1;
  &.show {
    display: flex !important;
  }

  @media (min-width: ${props => props.theme.responsive.mdDown}) {
    bottom: 0;
  }

  @media (max-width: ${props => props.theme.responsive.mdDown}) {
    top: 110px;
  }

  @media (max-width: 500px) {
    margin: 0;
    .modal-container-div {
      width: 100%;
    }
  }

  @media (max-width: ${props => props.theme.modal.size[props.size]}) {
    margin: 0;
    .modal-container-div {
      width: 100%;
    }
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

  main {
    display: flex;
    flex-direction: column;
    padding: 25px 30px;
    fieldset {
      width: 100%;
    }

    max-height: 400px;
    overflow-y: auto;
  }

  footer {
    border-top: 2px solid ${props => props.theme.colors.lightShade};
    padding: 20px 30px;
    display: flex;

    ${props => props.size === 'sm' && 'justify-content: space-between;'}
    ${props =>
      (props.size === 'lg' || props.size === 'xl') &&
      'justify-content: flex-end;'}

    > button {
      ${props =>
        (props.size === 'lg' || props.size === 'xl') && 'margin-left: 8px;'}
    }

    ${props =>
      props.reverse &&
      css`
        flex-direction: row-reverse;
      `}

    > * {
      ${props =>
        props.size === 'sm' && 'flex: 1; margin-left: 8px; margin-right: 8px;'}
      &:first-child {
        ${props => (props.reverse ? 'margin-right' : 'margin-left:') + '0;'}
      }
      &:last-child {
        ${props => (props.reverse ? 'margin-left' : 'margin-right:') + '0;'}
      }
    }
  }
`

export const Row = styled.div<RowProps>`
  display: inline-grid;
  ${props => props.cols === 2 && 'grid-template-columns: 1fr 1fr;'}
  ${props => props.cols === 3 && 'grid-template-columns: 1fr 1fr 1fr;'}
    grid-gap: 10px;
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
