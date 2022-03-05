import { AppProvider } from '@providers'
import { GlobalStyle } from '@styles'
import { AppProps } from 'next/app'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <Component {...pageProps} />
      <GlobalStyle />
    </AppProvider>
  )
}

export default App
