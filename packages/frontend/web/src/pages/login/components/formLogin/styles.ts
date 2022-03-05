import { Form } from '@unform/web'
import styled from 'styled-components'

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
