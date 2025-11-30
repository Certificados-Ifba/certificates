import SimpleBar from 'simplebar-react'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: stretch;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const Main = styled.main`
  flex: 1;
`

export const ScrollArea = styled(SimpleBar)`
  max-height: calc(100vh - 100px);
  width: 100%;
`
