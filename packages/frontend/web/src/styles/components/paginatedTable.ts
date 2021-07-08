import { shade } from 'polished'
import styled from 'styled-components'

export const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  tr {
    height: 58px;
    border-bottom: 2px solid ${props => props.theme.colors.lightShade};
    th,
    td {
      padding: 0 30px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
    }
  }
  thead {
    tr {
      th {
        text-align: left;
      }
    }
  }
  tbody {
    tr:hover {
      background-color: ${props => props.theme.colors.lightShade};
    }
  }
  /*
  border-spacing: 4px;
  font-size: 14px;
  thead {
    th {
      padding: 12px;
      text-align: center;
      font-weight: 500;
      color: ${props => props.theme.colors.medium};
      :first-child {
        text-align: left;
      }
    }
  }
  tbody {
    tr {
      background-color: ${props => shade(0.05, props.theme.colors.light)};
      color: ${props => props.theme.colors.dark};
      td {
        border-radius: 4px;
        vertical-align: middle;
        padding: 8px;
        text-transform: capitalize;
        text-align: center;
        white-space: nowrap;

        :first-child {
          text-align: left;
          font-weight: 500;
          position: relative;
          padding-left: 16px;
          ::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 4px;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            background-color: ${props => props.theme.colors.primary};
          }
          &.inactive {
            ::before {
              background-color: ${props => props.theme.colors.danger};
            }
          }
        }

        :last-child {
          line-height: 0;
          padding: 0;
          button {
            background-color: transparent;
            color: inherit;
            border: none;
            line-height: 0;
            padding: 4px 0;
            svg {
              margin: 0;
            }
          }
        }

        h3 {
          margin: 0;
          font-weight: 500;
        }

        span {
          margin-right: 5px;
        }
      }

      &.no-border td {
        border: 0;
        padding-top: 0;
      }
    }
  } */
`

export const Pagination = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;

  > div > span,
  > span {
    color: ${props => props.theme.colors.darkShade};
    font-size: 12px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    margin-right: 20px;
  }

  > span {
    flex: 1;
    flex-direction: row-reverse;
  }

  > div {
    align-items: center;
    display: inline-flex;
    > div {
      width: 80px;
      font-size: 12px;
      font-weight: 500;
    }
  }

  nav {
    display: flex;

    button {
      margin-left: 5px;
    }
  }
`

export const NoDataContainer = styled.div`
  height: 264px;
  justify-content: center;
  align-items: center;
  display: flex;
  span {
    color: ${props => props.theme.colors.dark};
    text-align: center;
    font-size: 14px;
    font-weight: 500;
  }
`

export const PaginateList = styled.div`
  display: flex;
  margin: 0 5px;
  button {
    span {
      font-size: 12px;
      width: 18px;
      font-weight: 400;
      text-align: center;
      display: block;
      color: ${props => props.theme.colors.darkTint};
    }
    &[disabled] {
      opacity: 1;
      span {
        font-weight: 600;
        color: ${props => props.theme.colors.dark};
      }
    }
  }
  /* a {
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 32px;
    height: 32px;
    &.active {
      color: ${props => props.theme.colors.primary};
      font-weight: 500;
    }
  } */
`
