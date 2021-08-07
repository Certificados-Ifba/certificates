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
        color: #664d03;
        background-color: #fff3cd;
        border-color: #ffecb5;
      `}
      ${props.type === 'danger' &&
      css`
        color: #842029;
        background-color: #f8d7da;
        border-color: #f5c2c7;
      `}
    `}

  display: flex;
  margin-bottom: ${props => props.theme.margins[props.marginBottom] || 0};
  .alert-icon {
    display: flex;
    svg {
      margin-top: auto;
      margin-bottom: auto;
      margin-left: 10px;
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
