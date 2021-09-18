import styled from 'styled-components'

export const Container = styled.div`
  background: ${props => props.theme.colors.lightTint};
  border-radius: 10px;
  box-shadow: 0px 4px 0px 0px rgb(237 237 246);
  header {
    min-height: 90px;
    border-bottom: 2px solid ${props => props.theme.colors.lightShade};
    padding: 25px 30px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    h2 {
      flex: 1;
      font-size: 1.25rem;
    }
    button {
      margin-left: 20px;
    }
    @media (max-width: ${props => props.theme.responsive.mdDown}) {
      h2 {
        margin-bottom: ${props => props.theme.margins.sm};
      }
      button {
        width: 100%;
        margin-bottom: ${props => props.theme.margins.sm};
        margin-left: 0;
      }

      form {
        width: 100%;
        margin-bottom: ${props => props.theme.margins.sm};
      }
    }
    .dropdown-content {
      button {
        margin-left: 0;
      }
    }
  }
`
