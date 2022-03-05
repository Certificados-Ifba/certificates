import styled from 'styled-components'

export const LayoutContainer = styled.div`
  display: flex;
  overflow-x: auto;
  margin-right: auto;
  margin-left: auto;
`

export const EditContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: ${props => props.theme.margins.sm};

  > .first-button {
    margin-right: ${props => props.theme.margins.sm};
  }
`
