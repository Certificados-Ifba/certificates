import { tint } from 'polished'
import { BaseHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

export interface CardIconElement extends BaseHTMLAttributes<HTMLDivElement> {
  color?: 'primary' | 'secondary' | 'danger' | 'warning' | 'info'
}

const colors = {
  primary: css`
    background: ${props => tint(0.8, props.theme.colors.primary)};
    color: ${props => props.theme.colors.primary};
  `,
  secondary: css`
    background: ${props => tint(0.8, props.theme.colors.secondary)};
    color: ${props => props.theme.colors.secondary};
  `,
  danger: css`
    background: ${props => tint(0.8, props.theme.colors.danger)};
    color: ${props => props.theme.colors.danger};
  `,
  warning: css`
    background: ${props => tint(0.8, props.theme.colors.warning)};
    color: ${props => props.theme.colors.warning};
  `,
  info: css`
    background: ${props => tint(0.8, props.theme.colors.info)};
    color: ${props => props.theme.colors.info};
  `
}

export const Container = styled.div<{ button: boolean }>`
  background: ${props => props.theme.colors.lightTint};
  border-radius: 10px;
  box-shadow: 0px 4px 0px 0px rgb(237 237 246);
  .button {
    padding: 10px 10px 10px 0;
    display: flex;
    justify-content: flex-end;
  }
  .info {
    padding: 40px 40px ${props => (props.button ? '0' : '40px')} 40px;
    display: flex;
    align-items: center;
    div + div {
      margin-left: 30px;
    }
    h3 {
      font-size: 1.75rem;
      margin-bottom: 11px;
      font-weight: 600;
    }
    h4 {
      font-size: 1rem;
      font-weight: 400;
      color: ${props => props.theme.colors.mediumShade};
    }
  }
`

export const IconArea = styled.div<CardIconElement>`
  padding: 23px;
  border-radius: 50%;
  min-width: 70px;
  min-height: 70px;
  svg {
    display: flex;
  }
  ${props => (props.color ? colors[props.color] : colors.primary)}
`
