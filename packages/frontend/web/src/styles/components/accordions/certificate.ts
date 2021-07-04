import styled, { css } from 'styled-components'

interface TextContainerProps {
  position: 'center' | 'custom'
  padding?: number
  paddingTop: number
  paddingBottom: number
  paddingLeft: number
  paddingRight: number
  displayGuide: boolean
}

interface ValidateContainerProps {
  verticalPosition: 'top' | 'bottom'
  horizontalPosition: 'left' | 'center' | 'right'
  horizontalPadding: number
  verticalPadding: number
  displayGuide: boolean
}

export const ImageContainer = styled.div`
  > img {
    width: 1280px;
  }
`

export const Container = styled.div`
  position: relative;
`

export const ValidateContainer = styled.div<ValidateContainerProps>`
  .text {
    position: absolute;
    font-size: small;
    ${props =>
      props.verticalPosition === 'top' && 'top:' + props.verticalPadding + '%;'}
    ${props =>
      props.verticalPosition === 'bottom' &&
      'bottom:' + props.verticalPadding + '%;'}
    ${props =>
      props.horizontalPosition === 'left' &&
      'left:' + props.horizontalPadding + '%;'}
    ${props =>
      props.horizontalPosition === 'right' &&
      'right:' + props.horizontalPadding + '%;'}
      ${props =>
      props.horizontalPosition === 'center' &&
      css`
        right: 0;
        width: 100%;
        text-align: center;
      `}
    ${props =>
      props.displayGuide &&
      css`
        z-index: 3;
        background-color: rgba(0, 0, 0, 0.3);
      `}
  }
  ${props =>
    props.displayGuide &&
    css`
      :after {
        background-color: ${props => props.theme.colors.primary};
        content: '';
        z-index: 1;
        opacity: 0.3;
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 100%;
      }
    `}
`

export const TextContainer = styled.div<TextContainerProps>`
  ${props =>
    (props.position === 'center' || props.position === 'custom') &&
    css`
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      .text {
        display: flex;
        width: 100%;
        height: 100%;
      }
      .center {
        margin-top: auto;
        margin-bottom: auto;
      }
    `}

  ${props =>
    props.displayGuide &&
    css`
      .text {
        z-index: 3;
        background-color: rgba(0, 0, 0, 0.3);
      }
      .text:after {
        background-color: ${props => props.theme.colors.primary};
        content: '';
        z-index: 1;
        opacity: 0.3;
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 100%;
      }
    `}

  ${props => props.position === 'center' && 'padding: ' + props.padding + '%;'}
  ${props =>
    props.position === 'custom' && 'padding-top: ' + props.paddingTop + '%;'}
  ${props =>
    props.position === 'custom' &&
    'padding-bottom: ' + props.paddingBottom + '%;'}
  ${props =>
    props.position === 'custom' && 'padding-left: ' + props.paddingLeft + '%;'}
  ${props =>
    props.position === 'custom' &&
    'padding-right: ' + props.paddingRight + '%;'}
`
