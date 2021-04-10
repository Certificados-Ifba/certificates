import { Form } from '@unform/web'
import { tint } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
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
`

export const Title = styled.h2`
  text-align: center;
`

export const LogoArea = styled.div`
  display: flex;
  grid-area: logo;
  flex-direction: column;
  align-items: center;  
  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    h1 {
      font: 600 30px Poppins, sans-serif;
      margin-left: 20px;
    }
    img {
      width: 70px;
    }
  }
  h2 {
    font: 600 20px Poppins, sans-serif;
    text-align: center;  
    margin: 12px 0 30px;  
    color: ${props => props.theme.colors.light};
  }  
  @media (min-width: ${props => props.theme.responsive.smDown}) {
    margin-bottom: 24px;
    div {
      h1 {
        font-size: 36px;
      }
      img {
        width: auto;
      }
    }
    h2 {
      font-size: 24px;
      margin: 12px 0 30px;
    }
  }
  @media (min-width: ${props => props.theme.responsive.mdDown}) {
    h2 {
      font-size: 32px;
      margin: 12px 0 30px;
    }
  }
  @media (min-width: ${props => props.theme.responsive.lgDown}) {
    align-items: flex-start;
    h2 {
      margin: 30px 0 30px;
      font-size: 32px;
      text-align: initial;
    }
  }
`

export const FormArea = styled(Form)`
  grid-area: form;
`

export const FormContainer = styled.div`  
  @media (max-width: ${props => props.theme.responsive.smDown}) {
    padding: 20px;
  }
  @media (min-width: ${props => props.theme.responsive.smDown}) {
    padding: 50px;
  }
`