import { AppProvider } from '@providers'
import { GlobalStyle } from '@styles'
import { AppProps, NextWebVitalsMetric } from 'next/app'
import 'simplebar/dist/simplebar.min.css'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <Component {...pageProps} />
      <GlobalStyle />
    </AppProvider>
  )
}

// export const reportWebVitals = (metric: NextWebVitalsMetric): void => {
//   console.log(metric)
// }

export default App
