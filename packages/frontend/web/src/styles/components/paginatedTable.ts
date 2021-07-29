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
`
