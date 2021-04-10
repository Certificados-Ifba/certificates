import styled from 'styled-components'

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  > * {
    flex: 1;
    margin-left: 8px;
    margin-right: 8px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
`

export default Row
