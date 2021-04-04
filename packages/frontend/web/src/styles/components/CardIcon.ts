import { tint } from 'polished'
import { BaseHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

export interface CardIconElement extends BaseHTMLAttributes<HTMLDivElement> {
  color?: 'primary' | 'secondary' | 'danger' | 'warning'
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
  `
}

export const Container = styled.div`
  width: calc(25% - 30px);
  min-width: 290px;
  padding: 40px;
  margin-bottom: 30px;
  background: ${props => props.theme.colors.lightTint};
  border-radius: 10px;
  box-shadow: 0px 4px 0px 0px rgb(237 237 246);
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

  @media (max-width: 1499px) {
    width: calc(50% - 20px);
  }

  @media (max-width: 839px) {
    width: 100%;
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
