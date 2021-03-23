import styled from 'styled-components'

export const Container = styled.div`
  margin: 43px 60px 64px;

  @media (max-width: 1024px) {
    margin: 43px 60px 64px;
  }

  @media (max-width: 768px) {
    margin: 20px 23px 30px;
  }

  > header {
    display: flex;
    align-items: center;
    margin-bottom: 45px;
    div {
      flex: 1;
      h1 {
        font-size: 1.875rem;
      }
      h2 {
        margin-top: 10px;
        font-size: 0.875rem;
        color: ${props => props.theme.colors.mediumShade};
        font-weight: 500;
      }
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
  }
`

export const ListCards = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 10px;

  > div {
    margin-left: 40px;
    &:first-child {
      margin-left: 0px;
    }
    &:first-child {
      margin-left: 0px;
    }
    @media (max-width: 1499px) {
      &:nth-child(2n + 1) {
        margin-left: 0px;
      }
    }
    @media (max-width: 839px) {
      margin-left: 0px;
    }
  }
`
