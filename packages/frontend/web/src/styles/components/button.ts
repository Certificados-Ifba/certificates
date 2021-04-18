import { transparentize } from 'polished'
import { ButtonHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'info'
    | 'success'
    | 'warning'
    | 'dark'
    | 'medium'
    | 'light'
  size?: 'small' | 'default' | 'big'
  ghost?: boolean
  outline?: boolean
  inline?: boolean
  loading?: boolean
  square?: boolean
  marginBottom?: string
}

const sizes = {
  small: css`
    padding: 0.4375rem
      ${(props: any) => (props.square ? '0.4375rem' : '0.75rem')};
    font-size: 0.75rem;
    * + span {
      margin-left: 0.625rem;
    }
  `,
  default: css`
    padding: 0.8125rem
      ${(props: any) => (props.square ? '0.8125rem' : '1.125rem')};
    font-size: 0.875rem;
    * + span {
      margin-left: 0.875rem;
    }
  `,
  big: css`
    padding: 1.125rem ${(props: any) => (props.square ? '1.125rem' : '1.25rem')};
    font-size: 1rem;
    * + span {
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
  info: css`
    background: ${(props: any) =>
      props.outline || props.ghost ? 'transparent' : props.theme.colors.info};
    border-color: ${(props: any) =>
      props.ghost ? 'transparent' : props.theme.colors.info};
    color: ${(props: any) =>
      props.outline || props.ghost
        ? props.theme.colors.info
        : props.theme.colors.light};
    &:hover {
      background: ${(props: any) =>
        props.outline || props.ghost
          ? transparentize(0.8, props.theme.colors.info)
          : props.theme.colors.infoShade};
      border-color: ${(props: any) =>
        props.ghost ? 'transparent' : props.theme.colors.infoShade};
    }
    &:active {
      background: ${(props: any) =>
        props.outline || props.ghost
          ? transparentize(0.9, props.theme.colors.info)
          : props.theme.colors.infoTint};
      border-color: ${(props: any) =>
        props.ghost ? 'transparent' : props.theme.colors.infoTint};
    }
  `,
  success: css`
    background: ${(props: any) =>
      props.outline || props.ghost
        ? 'transparent'
        : props.theme.colors.success};
    border-color: ${(props: any) =>
      props.ghost ? 'transparent' : props.theme.colors.success};
    color: ${(props: any) =>
      props.outline || props.ghost
        ? props.theme.colors.success
        : props.theme.colors.light};
    &:hover {
      background: ${(props: any) =>
        props.outline || props.ghost
          ? transparentize(0.8, props.theme.colors.success)
          : props.theme.colors.successShade};
      border-color: ${(props: any) =>
        props.ghost ? 'transparent' : props.theme.colors.successShade};
    }
    &:active {
      background: ${(props: any) =>
        props.outline || props.ghost
          ? transparentize(0.9, props.theme.colors.success)
          : props.theme.colors.successTint};
      border-color: ${(props: any) =>
        props.ghost ? 'transparent' : props.theme.colors.successTint};
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
  `,
  dark: css`
    background: ${(props: any) =>
      props.outline || props.ghost ? 'transparent' : props.theme.colors.dark};
    border-color: ${(props: any) =>
      props.ghost ? 'transparent' : props.theme.colors.dark};
    color: ${(props: any) =>
      props.outline || props.ghost
        ? props.theme.colors.dark
        : props.theme.colors.light};
    &:hover {
      background: ${(props: any) =>
        props.outline || props.ghost
          ? transparentize(0.8, props.theme.colors.dark)
          : props.theme.colors.darkShade};
      border-color: ${(props: any) =>
        props.ghost ? 'transparent' : props.theme.colors.darkShade};
    }
    &:active {
      background: ${(props: any) =>
        props.outline || props.ghost
          ? transparentize(0.9, props.theme.colors.dark)
          : props.theme.colors.darkTint};
      border-color: ${(props: any) =>
        props.ghost ? 'transparent' : props.theme.colors.darkTint};
    }
  `,
  medium: css`
    background: ${(props: any) =>
      props.outline || props.ghost ? 'transparent' : props.theme.colors.medium};
    border-color: ${(props: any) =>
      props.ghost ? 'transparent' : props.theme.colors.medium};
    color: ${(props: any) =>
      props.outline || props.ghost
        ? props.theme.colors.medium
        : props.theme.colors.dark};
    &:hover {
      background: ${(props: any) =>
        props.outline || props.ghost
          ? transparentize(0.8, props.theme.colors.medium)
          : props.theme.colors.mediumShade};
      border-color: ${(props: any) =>
        props.ghost ? 'transparent' : props.theme.colors.mediumShade};
    }
    &:active {
      background: ${(props: any) =>
        props.outline || props.ghost
          ? transparentize(0.9, props.theme.colors.medium)
          : props.theme.colors.mediumTint};
      border-color: ${(props: any) =>
        props.ghost ? 'transparent' : props.theme.colors.mediumTint};
    }
  `,
  ligth: css`
    background: ${(props: any) =>
      props.outline || props.ghost ? 'transparent' : props.theme.colors.ligth};
    border-color: ${(props: any) =>
      props.ghost ? 'transparent' : props.theme.colors.ligth};
    color: ${(props: any) =>
      props.outline || props.ghost
        ? props.theme.colors.ligth
        : props.theme.colors.dark};
    &:hover {
      background: ${(props: any) =>
        props.outline || props.ghost
          ? transparentize(0.8, props.theme.colors.ligth)
          : props.theme.colors.ligthShade};
      border-color: ${(props: any) =>
        props.ghost ? 'transparent' : props.theme.colors.ligthShade};
    }
    &:active {
      background: ${(props: any) =>
        props.outline || props.ghost
          ? transparentize(0.9, props.theme.colors.ligth)
          : props.theme.colors.ligthTint};
      border-color: ${(props: any) =>
        props.ghost ? 'transparent' : props.theme.colors.ligthTint};
    }
  `
}

export const Container = styled.button.attrs<ButtonProps>(props => ({
  disabled: props.disabled || !!props.loading
}))<ButtonProps>`
  ${props =>
    props.marginBottom === 'sm' &&
    'margin-bottom:' + props.theme.margins.sm + ';'}
  ${props =>
    props.marginBottom === 'md' &&
    'margin-bottom:' + props.theme.margins.md + ';'}
${props =>
    props.marginBottom === 'lg' &&
    'margin-bottom:' + props.theme.margins.ld + ';'}

  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid;
  border-radius: 5px;
  font-weight: 600;

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  i {
    margin: 0;
  }

  ${props => (props.size ? sizes[props.size] : sizes.default)}
  ${props => (props.color ? colors[props.color] : colors.primary)}
`
