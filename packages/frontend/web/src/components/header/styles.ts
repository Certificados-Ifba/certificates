import styled from 'styled-components'

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 45px;
  h1 {
    font-size: 1.875rem;
  }
  h2 {
    margin-top: 10px;
    font-size: 0.875rem;
    color: ${props => props.theme.colors.mediumShade};
    font-weight: 500;
  }
  nav {
    display: flex;
    align-items: center;
    button {
      margin-left: 30px;

      @media (max-width: 1024px) {
        margin-left: 20px;
      }
      @media (max-width: 768px) {
        margin-left: 15px;
      }
    }
  }
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
