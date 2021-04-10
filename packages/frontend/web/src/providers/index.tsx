import { Router } from 'next/router'
import NProgress from 'nprogress'
import { ThemeProvider } from 'styled-components'

import theme from '../styles/theme'
import AuthProvider from './auth'
import SidebarProvider from './sidebar'
import ToastProvider from './toast'
import 'nprogress/nprogress.css'

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const AppProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ToastProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default AppProvider
