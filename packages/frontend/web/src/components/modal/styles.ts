import { transparentize } from 'polished'
import SimpleBar from 'simplebar-react'
import styled, { css } from 'styled-components'

import { ModalProps } from '.'

type IContainer = Pick<ModalProps, 'size'>

interface RowProps {
  cols: 2 | 3
}

interface IFooterModal {
  inline?: boolean
}

export const Container = styled.div<IContainer>`
  .modal-container-div {
    margin: 0 1rem;
    width: ${props => props.theme.modal.size[props.size]};
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
    top: 114px;
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
`

export const HeaderModal = styled.header`
  h2 {
    display: flex;
    margin: 0 !important;
    svg {
      margin-top: auto;
      margin-bottom: auto;
      margin-right: 1rem;
    }
  }
  @media (max-width: ${({ theme }) => theme.responsive.smDown}) {
    min-height: 60px;
  }
`

export const ScrollWrapper = styled(SimpleBar)`
  width: 100%;
  max-height: 50vh;
  @media (max-width: ${props => props.theme.responsive.mdDown}) {
    max-height: calc(100vh - 308px);
  }
`
interface IMainModal {
  noPadding?: boolean
}

export const MainModal = styled.main<IMainModal>`
  display: flex;
  flex-direction: column;
  ${({ noPadding }) =>
    !noPadding ? 'padding: 25px 30px;' : 'padding: 0px 0px 8px;'}
  fieldset {
    width: 100%;
  }
`

export const FooterModal = styled.footer<IFooterModal>`
  border-top: 2px solid ${props => props.theme.colors.lightShade};
  padding: 20px 30px;
  display: flex;
  gap: 16px;
  ${({ inline }) =>
    inline &&
    css`
      justify-content: flex-end;
      > button {
        width: auto;
      }
    `}
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
