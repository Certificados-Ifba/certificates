import { Form } from '@unform/web'
import styled from 'styled-components'

export const Container = styled.div`
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 24px 20px;
  header h2 {
    text-align: center;
    font-size: 1rem;
    margin: 0;
    @media (min-width: ${props => props.theme.responsive.smDown}) {
      font-size: 1.5rem;
    }
  }
`

export const LogoArea = styled.div`
  display: flex;
  grid-area: logo;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
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
  @media (min-width: ${props => props.theme.responsive.smDown}) {
    div {
      h1 {
        font-size: 36px;
      }
      img {
        width: auto;
      }
    }
  }
  @media (min-width: ${props => props.theme.responsive.lgDown}) {
    align-items: flex-start;
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
