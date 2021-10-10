import styled, { css } from 'styled-components'

interface ContainerProps {
  hasAlert?: boolean
  titleForm?: boolean
}

export const Container = styled.div<ContainerProps>`
  margin: 43px 60px 64px;

  @media (max-width: 1024px) {
    margin: 43px 60px 64px;
  }

  @media (max-width: 768px) {
    margin: 24px 30px 32px;
  }

  > header {
    ${props =>
      props.titleForm &&
      css`
        display: block;
        form {
          margin-top: 10px;
          width: 100%;
        }
        @media (min-width: ${props => props.theme.responsive.lgDown}) {
          display: flex;
          align-items: center;
          > form {
            flex: 1;
            margin-left: 40px;
          }
          > div {
            flex: 1;
          }
        }
      `}

    ${props =>
      !props.titleForm &&
      css`
        display: flex;
        align-items: center;
      `}    

    ${props => !props.hasAlert && 'margin-bottom: 45px;'}

    div {
      ${props => !props.titleForm && 'flex: 1;'}
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

  .alert {
    ${props =>
      props.hasAlert &&
      css`
        margin-bottom: 20px;
        margin-top: 10px;
      `}
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

export const TableRow = styled.div`
  display: flex;
  align-items: center;
  svg {
    min-width: 20px;
    min-height: 20px;
  }
  > span {
    margin-left: 10px;
  }
`
