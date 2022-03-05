import styled, { css } from 'styled-components'

interface Props {
  paddingSize?: 'lg' | 'md'
  padding: boolean
  paddingBottom?: boolean
}

export const FormContent = styled.div<Props>`
  ${props =>
    props.paddingBottom &&
    css`
      @media (max-width: ${props => props.theme.responsive.smDown}) {
        padding-bottom: 20px;
      }
      @media (min-width: ${props => props.theme.responsive.smDown}) {
        padding-bottom: ${!props.paddingSize || props.paddingSize === 'lg'
          ? '50'
          : '30'}px;
      }
    `}
  ${props =>
    props.padding &&
    css`
      @media (max-width: ${props => props.theme.responsive.smDown}) {
        padding: 20px;
      }
      @media (min-width: ${props => props.theme.responsive.smDown}) {
        padding: ${!props.paddingSize || props.paddingSize === 'lg'
          ? '50'
          : '30'}px;
      }
    `}
`
