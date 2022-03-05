import { tint, transparentize } from 'polished'
import { animated } from 'react-spring'
import styled, { css } from 'styled-components'

interface Props {
  type?: 'success' | 'warning' | 'error' | 'info'
}

const toastTypeVariations = {
  info: css`
    background: ${props => tint(0.8, props.theme.colors.secondaryTint)};
    color: ${props => props.theme.colors.secondaryShade};
  `,
  warning: css`
    background: ${props => tint(0.8, props.theme.colors.warningTint)};
    color: ${props => props.theme.colors.warningShade};
  `,
  success: css`
    background: ${props => tint(0.8, props.theme.colors.successTint)};
    color: ${props => props.theme.colors.successShade};
  `,
  error: css`
    background: ${props => tint(0.8, props.theme.colors.dangerTint)};
    color: ${props => props.theme.colors.dangerShade};
  `
}

export const Container = styled(animated.div)<Props>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px
    ${props => transparentize(0.8, props.theme.colors.darkShade)};
  display: flex;
  align-items: center;
  & + div {
    margin-top: 8px;
  }
  ${props => toastTypeVariations[props.type || 'info']}
  > svg {
    margin: 4px 12px 0 0;
  }
  div {
    flex: 1;
    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }
  button {
    position: absolute;
    right: 16px;
    top: 18px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }
  svg {
    margin-top: 0;
  }
  @media (max-width: 425px) {
    width: 100%;
  }
`
