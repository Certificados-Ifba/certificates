import styled, { css } from 'styled-components'

interface Props {
  active: boolean
  align: 'left' | 'right'
}

export const Container = styled.div<Props>`
  position: relative;
  display: inline-block;

  > div {
    /* min-width: 200px; */
    display: none;
    position: absolute;
    border-radius: 10px;
    box-shadow: 0px 0px 3px 0px ${props => props.theme.colors.mediumTint};
    background: ${props => props.theme.colors.lightTint};
    padding: ${props => props.theme.margins.sm};
    z-index: 15;
    top: calc(100% + 4px);
    ${({ align }) => align === 'right' && 'right: 0;'}
    span {
      width: max-content;
    }
  }

  ${props =>
    props.active &&
    css`
      > div {
        display: block;
        box-shadow: 0px 0px 5px 0px ${props => props.theme.colors.mediumTint};
      }
    `}
`

export const DropdownContent = styled.div``
