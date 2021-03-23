import { transparentize } from 'polished'
import { ButtonHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'danger' | 'warning'
  size?: 'small' | 'default' | 'big'
  ghost?: boolean
  outline?: boolean
  inline?: boolean
  loading?: boolean
  square?: boolean
}

const sizes = {
  small: css`
    padding: 0.5rem ${(props: any) => (props.square ? '0.5rem' : '0.75rem')};
    font-size: 0.75rem;
    svg + span {
      margin-left: 0.625rem;
    }
  `,
  default: css`
    padding: 0.8125rem
      ${(props: any) => (props.square ? '0.8125rem' : '1.125rem')};
    font-size: 0.875rem;
    svg + span {
      margin-left: 0.875rem;
    }
  `,
  big: css`
    padding: 1.125rem ${(props: any) => (props.square ? '1.125rem' : '1.25rem')};
    font-size: 1rem;
    svg + span {
      margin-left: 1rem;
    }
  `
}

const colors = {
  primary: css`
    background: ${(props: any) =>
      props.outline || props.ghost
        ? 'transparent'
        : props.theme.colors.primary};
    border-color: ${(props: any) =>
      props.ghost ? 'transparent' : props.theme.colors.primary};
    color: ${(props: any) =>
      props.outline || props.ghost
        ? props.theme.colors.primary
        : props.theme.colors.light};
    &:hover {
      background: ${(props: any) =>
        props.outline || props.ghost
          ? transparentize(0.8, props.theme.colors.primary)
          : props.theme.colors.primaryShade};
      border-color: ${(props: any) =>
        props.ghost ? 'transparent' : props.theme.colors.primaryShade};
    }
    &:active {
      background: ${(props: any) =>
        props.outline || props.ghost
          ? transparentize(0.9, props.theme.colors.primary)
          : props.theme.colors.primaryTint};
      border-color: ${(props: any) =>
        props.ghost ? 'transparent' : props.theme.colors.primaryTint};
    }
  `,
  secondary: css`
    background: ${(props: any) =>
      props.outline || props.ghost
        ? 'transparent'
        : props.theme.colors.secondary};
    border-color: ${(props: any) =>
      props.ghost ? 'transparent' : props.theme.colors.secondary};
    color: ${(props: any) =>
      props.outline || props.ghost
        ? props.theme.colors.secondary
        : props.theme.colors.light};
    &:hover {
      background: ${(props: any) =>
        props.outline || props.ghost
          ? transparentize(0.8, props.theme.colors.secondary)
          : props.theme.colors.secondaryShade};
      border-color: ${(props: any) =>
        props.ghost ? 'transparent' : props.theme.colors.secondaryShade};
    }
    &:active {
      background: ${(props: any) =>
        props.outline || props.ghost
          ? transparentize(0.9, props.theme.colors.secondary)
          : props.theme.colors.secondaryTint};
      border-color: ${(props: any) =>
        props.ghost ? 'transparent' : props.theme.colors.secondaryTint};
    }
  `,
  danger: css`
    background: ${(props: any) =>
      props.outline || props.ghost ? 'transparent' : props.theme.colors.danger};
    border-color: ${(props: any) =>
      props.ghost ? 'transparent' : props.theme.colors.danger};
    color: ${(props: any) =>
      props.outline || props.ghost
        ? props.theme.colors.danger
        : props.theme.colors.light};
    &:hover {
      background: ${(props: any) =>
        props.outline || props.ghost
          ? transparentize(0.8, props.theme.colors.danger)
          : props.theme.colors.dangerShade};
      border-color: ${(props: any) =>
        props.ghost ? 'transparent' : props.theme.colors.dangerShade};
    }
    &:active {
      background: ${(props: any) =>
        props.outline || props.ghost
          ? transparentize(0.9, props.theme.colors.danger)
          : props.theme.colors.dangerTint};
      border-color: ${(props: any) =>
        props.ghost ? 'transparent' : props.theme.colors.dangerTint};
    }
  `,
  warning: css`
    background: ${(props: any) =>
      props.outline || props.ghost
        ? 'transparent'
        : props.theme.colors.warning};
    border-color: ${(props: any) =>
      props.ghost ? 'transparent' : props.theme.colors.warning};
    color: ${(props: any) =>
      props.outline || props.ghost
        ? props.theme.colors.warning
        : props.theme.colors.light};
    &:hover {
      background: ${(props: any) =>
        props.outline || props.ghost
          ? transparentize(0.8, props.theme.colors.warning)
          : props.theme.colors.warningShade};
      border-color: ${(props: any) =>
        props.ghost ? 'transparent' : props.theme.colors.warningShade};
    }
    &:active {
      background: ${(props: any) =>
        props.outline || props.ghost
          ? transparentize(0.9, props.theme.colors.warning)
          : props.theme.colors.warningTint};
      border-color: ${(props: any) =>
        props.ghost ? 'transparent' : props.theme.colors.warningTint};
    }
  `
}

export const Container = styled.button.attrs<ButtonProps>(props => ({
  disabled: props.disabled || !!props.loading
}))<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid;
  border-radius: 5px;

  ${props => (props.size ? sizes[props.size] : sizes.default)}
  ${props => (props.color ? colors[props.color] : colors.primary)}
`
