import { shade, tint } from 'polished'
import styled, { css } from 'styled-components'

interface Props {
  marginBottom?: 'sm' | 'md' | 'lg' | 'xs'
  type: 'info' | 'warning' | 'danger' | 'success'
  fontSize: string
  card?: boolean
}

export const Container = styled.div<Props>`
  ${props =>
    props.card &&
    css`
      border-radius: 10px;
      box-shadow: 0px 0px 3px 0px ${props => props.theme.colors.mediumTint};
      padding: 20px;
      ${props.type === 'warning' &&
      css`
        color: ${({ theme }) => shade(0.4, theme.colors.warningShade)};
        background-color: ${({ theme }) => tint(0.7, theme.colors.warningTint)};
      `}
      ${props.type === 'danger' &&
      css`
        color: ${({ theme }) => shade(0.4, theme.colors.dangerShade)};
        background-color: ${({ theme }) => tint(0.7, theme.colors.dangerTint)};
      `}
      ${props.type === 'success' &&
      css`
        color: ${({ theme }) => shade(0.4, theme.colors.successShade)};
        background-color: ${({ theme }) => tint(0.7, theme.colors.successTint)};
      `}
      ${props.type === 'info' &&
      css`
        color: ${({ theme }) => shade(0.4, theme.colors.infoShade)};
        background-color: ${({ theme }) => tint(0.7, theme.colors.infoTint)};
      `}
    `}

  display: flex;
  margin-bottom: ${({ theme, marginBottom }) =>
    theme.margins[marginBottom] || 0};
  .alert-icon {
    display: flex;
    svg {
      margin-top: auto;
      margin-bottom: auto;
      margin-left: auto;
      margin-right: 10px;
      color: ${props => props.theme.colors[props.type]};
    }
  }
  .message {
    margin-top: auto;
    margin-bottom: auto;
    font-size: ${props => props.fontSize};
  }
`
