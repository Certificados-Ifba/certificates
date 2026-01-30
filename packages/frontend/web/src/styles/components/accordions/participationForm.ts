import styled from 'styled-components'

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;
`

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Label = styled.label`
  font-weight: 500;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 5px;
`

export const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const InfoOption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const TitleOption = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.theme.colors.dark};
  margin: 0;
`
