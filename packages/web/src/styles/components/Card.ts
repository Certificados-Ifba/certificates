import styled from 'styled-components'

export const Container = styled.div`
  background: ${props => props.theme.colors.lightTint};
  border-radius: 10px;
  box-shadow: 0px 4px 0px 0px rgb(237 237 246);
  header {
    border-bottom: 2px solid ${props => props.theme.colors.lightShade};
    padding: 25px 30px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    h2 {
      flex: 1;
      font-size: 1.25rem;
    }
  }
`
