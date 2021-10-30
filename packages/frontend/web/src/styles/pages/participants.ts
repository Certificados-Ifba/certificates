import { Form } from '@unform/web'
import styled, { css } from 'styled-components'

export const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  > div {
    max-width: 500px;
  }
`

export const InfoContainer = styled.div`
  margin: 10px;
`

export const ButtonContainer = styled.div`
  margin-top: 10px;
`

export const ImageContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  svg {
    width: 100%;
  }
`

interface ContainerProps {
  login: boolean
  maxWidth: number
  marginTopSm?: boolean
}

export const Container = styled.div<ContainerProps>`
  ${props =>
    props.marginTopSm &&
    css`
      @media (min-width: ${props => props.theme.responsive.smDown}) {
        margin-top: 70px;
      }
    `}
  ${props =>
    props.login &&
    css`
      justify-content: center;
      align-items: center;
      width: 100%;
      max-width: 500px;
      margin: 24px 20px;
      @media (min-width: ${props => props.theme.responsive.lgDown}) {
        display: grid;
        grid-template-columns: 1fr 550px 480px 1fr;
        column-gap: 50px;
        grid-template-rows: 1fr 480px 1fr;
        grid-template-areas:
          '. . . .'
          '. logo form .'
          '. . . .';
      }
    `}
  width: 100%;
  max-width: ${props => props.maxWidth}px;
  margin: 24px 20px;

  header h2 {
    display: flex;
    button {
      margin-left: auto;
    }
    span {
      margin-left: 15px;
    }
    svg {
      color: ${props => props.theme.colors.primary};
    }
    span,
    svg {
      margin-top: auto;
      margin-bottom: auto;
    }
    justify-content: ${props => (props.login ? 'center' : 'left')};
    font-size: 1rem;
    margin: 0;
    @media (min-width: ${props => props.theme.responsive.smDown}) {
      font-size: 1.3rem;
    }
  }
`

export const FormArea = styled(Form)`
  grid-area: form;
`
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`

export const TopButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  > div {
    @media (min-width: ${props => props.theme.responsive.smDown}) {
      display: -webkit-inline-box;
    }
`

export const FormContainer = styled.div<{
  paddingSize?: 'lg' | 'md'
  padding: boolean
  paddingBottom?: boolean
}>`
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
