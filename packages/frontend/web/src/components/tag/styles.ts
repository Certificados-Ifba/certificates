import { tint } from 'polished'
import styled, { css } from 'styled-components'

import { TagProps } from '.'

const sizes = {
  sm: css`
    min-height: 20px;
    line-height: 20px;
    font-size: 12px;
    padding: 0px 8px;
  `,
  md: css`
    min-height: 24px;
    line-height: 24px;
    font-size: 14px;
    padding: 0px 8px;
  `,
  lg: css`
    min-height: 32px;
    line-height: 32px;
    font-size: 16px;
    padding: 0px 12px;
  `
}
const colors = {
  primary: css`
    background: ${(props: any) =>
      props.variant === 'outline'
        ? 'transparent'
        : props.variant === 'subtle'
        ? tint(0.7, props.theme.colors.primary)
        : props.theme.colors.primary};
    border-color: ${(props: any) =>
      props.variant === 'subtle'
        ? tint(0.7, props.theme.colors.primary)
        : props.theme.colors.primary};
    color: ${(props: any) =>
      props.variant === 'outline'
        ? props.theme.colors.primary
        : props.variant === 'subtle'
        ? props.theme.colors.primaryShade
        : props.theme.colors.light};
  `,
  secondary: css`
    background: ${(props: any) =>
      props.variant === 'outline'
        ? 'transparent'
        : props.variant === 'subtle'
        ? tint(0.7, props.theme.colors.secondary)
        : props.theme.colors.secondary};
    border-color: ${(props: any) =>
      props.variant === 'subtle'
        ? tint(0.7, props.theme.colors.secondary)
        : props.theme.colors.secondary};
    color: ${(props: any) =>
      props.variant === 'outline'
        ? props.theme.colors.secondary
        : props.variant === 'subtle'
        ? props.theme.colors.secondaryShade
        : props.theme.colors.light};
  `,
  danger: css`
    background: ${(props: any) =>
      props.variant === 'outline'
        ? 'transparent'
        : props.variant === 'subtle'
        ? tint(0.7, props.theme.colors.danger)
        : props.theme.colors.danger};
    border-color: ${(props: any) =>
      props.variant === 'subtle'
        ? tint(0.7, props.theme.colors.danger)
        : props.theme.colors.danger};
    color: ${(props: any) =>
      props.variant === 'outline'
        ? props.theme.colors.danger
        : props.variant === 'subtle'
        ? props.theme.colors.dangerShade
        : props.theme.colors.light};
  `,
  info: css`
    background: ${(props: any) =>
      props.variant === 'outline'
        ? 'transparent'
        : props.variant === 'subtle'
        ? tint(0.7, props.theme.colors.info)
        : props.theme.colors.info};
    border-color: ${(props: any) =>
      props.variant === 'subtle'
        ? tint(0.7, props.theme.colors.info)
        : props.theme.colors.info};
    color: ${(props: any) =>
      props.variant === 'outline'
        ? props.theme.colors.info
        : props.variant === 'subtle'
        ? props.theme.colors.infoShade
        : props.theme.colors.light};
  `,
  success: css`
    background: ${(props: any) =>
      props.variant === 'outline'
        ? 'transparent'
        : props.variant === 'subtle'
        ? tint(0.7, props.theme.colors.success)
        : props.theme.colors.success};
    border-color: ${(props: any) =>
      props.variant === 'subtle'
        ? tint(0.7, props.theme.colors.success)
        : props.theme.colors.success};
    color: ${(props: any) =>
      props.variant === 'outline'
        ? props.theme.colors.success
        : props.variant === 'subtle'
        ? props.theme.colors.successShade
        : props.theme.colors.light};
  `,
  warning: css`
    background: ${(props: any) =>
      props.variant === 'outline'
        ? 'transparent'
        : props.variant === 'subtle'
        ? tint(0.7, props.theme.colors.warning)
        : props.theme.colors.warning};
    border-color: ${(props: any) =>
      props.variant === 'subtle'
        ? tint(0.7, props.theme.colors.warning)
        : props.theme.colors.warning};
    color: ${(props: any) =>
      props.variant === 'outline'
        ? props.theme.colors.warning
        : props.variant === 'subtle'
        ? props.theme.colors.warningShade
        : props.theme.colors.light};
  `,
  dark: css`
    background: ${(props: any) =>
      props.variant === 'outline'
        ? 'transparent'
        : props.variant === 'subtle'
        ? tint(0.7, props.theme.colors.dark)
        : props.theme.colors.dark};
    border-color: ${(props: any) =>
      props.variant === 'subtle'
        ? tint(0.7, props.theme.colors.dark)
        : props.theme.colors.dark};
    color: ${(props: any) =>
      props.variant === 'outline'
        ? props.theme.colors.dark
        : props.variant === 'subtle'
        ? props.theme.colors.darkShade
        : props.theme.colors.light};
  `,
  medium: css`
    background: ${(props: any) =>
      props.variant === 'outline'
        ? 'transparent'
        : props.variant === 'subtle'
        ? tint(0.7, props.theme.colors.medium)
        : props.theme.colors.medium};
    border-color: ${(props: any) =>
      props.variant === 'subtle'
        ? tint(0.7, props.theme.colors.medium)
        : props.theme.colors.medium};
    color: ${(props: any) =>
      props.variant === 'outline'
        ? props.theme.colors.mediumShade
        : props.variant === 'subtle'
        ? props.theme.colors.darkTint
        : props.theme.colors.dark};
  `,
  light: css`
    background: ${(props: any) =>
      props.variant === 'outline'
        ? 'transparent'
        : props.variant === 'subtle'
        ? tint(0.7, props.theme.colors.light)
        : props.theme.colors.light};
    border-color: ${(props: any) =>
      props.variant === 'subtle'
        ? tint(0.7, props.theme.colors.light)
        : props.theme.colors.light};
    color: ${(props: any) =>
      props.variant === 'outline'
        ? props.theme.colors.light
        : props.variant === 'subtle'
        ? props.theme.colors.ligthShade
        : props.theme.colors.dark};
  `
}

export const Container = styled.div<TagProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  border-width: 2px;
  border-style: solid;
  white-space: nowrap;
  ${({ size }) => (size ? sizes[size] : sizes.md)}
  ${({ color }) => (color ? colors[color] : colors.primary)}
`
