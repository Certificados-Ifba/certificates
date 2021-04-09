import cookie from 'cookie'
import App, { AppInitialProps } from 'next/app'
import { ReactElement } from 'react'

import { CookieMessage } from '../@types'
import PageWithLayoutType from '../@types/pageWithLayout'
import AppProvider from '../contexts'
import { AuthProvider } from '../providers/auth'
import GlobalStyle from '../styles/global'

type AppProps = {
  Component: PageWithLayoutType
  pageProps: any
  // authenticated: boolean
}

// class MyApp extends App<AppProps> {
//   render(): ReactElement {
//     const { Component, pageProps, authenticated } = this.props
//     const Layout = Component.layout || (children => <>{children}</>)
//     return (
//       <AuthProvider authenticated={authenticated}>
//         <AppProvider>
//           {/* <Layout> */}
//           <Component {...pageProps} />
//           <GlobalStyle />
//           {/* </Layout> */}
//         </AppProvider>
//       </AuthProvider>
//     )
//   }
// }

// MyApp.getInitialProps = async (
//   appContext
// ): Promise<AppInitialProps & AppProps> => {
//   let authenticated = false
//   const request = appContext.ctx.req as CookieMessage
//   if (request) {
//     request.cookies = cookie.parse(request.headers.cookie || '')
//     authenticated = !!request.cookies.session
//   }

//   // Call the page's `getInitialProps` and fill `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext)

//   return { ...appProps, authenticated }
// }

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const Layout = Component.layout || (children => <>{children}</>)

  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
        <GlobalStyle />
      </Layout>
    </AppProvider>
  )
}

export default MyApp
