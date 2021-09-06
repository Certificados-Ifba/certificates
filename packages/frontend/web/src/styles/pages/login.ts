import { Form } from '@unform/web'
import styled from 'styled-components'

export const TopButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
`

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
  header h2 {
    text-align: center;
    font-size: 1rem;
    margin: 0;
    @media (min-width: ${props => props.theme.responsive.smDown}) {
      font-size: 1.5rem;
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
