import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import { SidebarProvider } from '../contexts/SidebarContext'
import GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import DefaultLayout from './_layouts/default'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const Layout = DefaultLayout

  return (
    <ThemeProvider theme={theme}>
      <SidebarProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SidebarProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default MyApp
