import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  @media (max-width: 1024px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: ${props => props.theme.responsive.mdDown}) {
    html {
      font-size: 87.5%;
    }
    .hide-md-down {
      display: none !important;
    }
  }

  body {
    background-color: ${props => props.theme.colors.light};
    color: ${props => props.theme.colors.darkShade};
  }

  body,
  input,
  select,
  textarea,
  button {
    font: 400 1rem 'Inter', sans-serif;
    outline: none;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`
