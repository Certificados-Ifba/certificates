import { AppProps } from 'next/app'
import { Router } from 'next/router'
import NProgress from 'nprogress'

import AppProvider from '../contexts'
import useAuth from '../hooks/useAuth'
import GlobalStyle from '../styles/global'
import AuthLayout from './_layouts/auth'
import DefaultLayout from './_layouts/default'

// Router.events.on('routeChangeStart', url => {
//   console.log(`Loading: ${url}`)
//   NProgress.start()
// })
// Router.events.on('routeChangeComplete', () => NProgress.done())
// Router.events.on('routeChangeError', () => NProgress.done())

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { user } = useAuth()
  console.log(user)

  const Layout = !user ? DefaultLayout : AuthLayout

  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <GlobalStyle />
    </AppProvider>
  )
}

export default MyApp
