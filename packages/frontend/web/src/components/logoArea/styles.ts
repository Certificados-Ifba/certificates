import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  grid-area: logo;
  flex-direction: column;
  margin-bottom: 40px;

  .text {
    font: 300 15px Poppins, sans-serif;
    width: 100%;
    margin: 30px 0 10px;
    color: ${props => props.theme.colors.light};
    display: none;
  }

  h2 {
    font: 600 20px Poppins, sans-serif;
    color: ${props => props.theme.colors.light};
    display: none;
    align-items: center;
    svg {
      margin-right: 10px;
    }
    margin-bottom: 5px;
  }
  @media (min-width: ${props => props.theme.responsive.smDown}) {
    div {
      img {
        width: auto;
      }
    }
  }
  @media (min-width: ${props => props.theme.responsive.lgDown}) {
    h2 {
      font-size: 32px;
      display: flex;
    }
    .text {
      display: flex;
      font-size: 20px;
    }
  }
`
