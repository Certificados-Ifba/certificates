import { AuthProvider, SidebarProvider, ToastProvider } from '@providers'
import { theme } from '@styles'
import { Router } from 'next/router'
import NProgress from 'nprogress'
import { ThemeProvider } from 'styled-components'

import 'nprogress/nprogress.css'

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export const AppProvider: React.FC = ({ children }) => {
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
