import styled from 'styled-components'

export const Container = styled.div`
  .editor-class {
    border-radius: 5px;
    border: 2px solid ${props => props.theme.colors.mediumTint};
  }
`
export const Label = styled.label`
  display: block;
  font-weight: bold;
  font-size: 1rem;
  line-height: 20px;
  margin-bottom: 8px;
`
