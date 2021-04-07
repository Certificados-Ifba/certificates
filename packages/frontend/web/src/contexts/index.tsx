import { ThemeProvider } from 'styled-components'

import useAuth from '../hooks/useAuth'
import AuthLayout from '../pages/_layouts/auth'
import DefaultLayout from '../pages/_layouts/default'
import theme from '../styles/theme'
import AuthProvider from './AuthContext'
import SidebarProvider from './SidebarContext'
import ToastProvider from './ToastContext'

const AppProvider: React.FC = ({ children }) => {
  const { user } = useAuth()
  console.log(user)
  const Layout = user ? DefaultLayout : AuthLayout

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ToastProvider>
          <SidebarProvider>
            <Layout>{children}</Layout>
          </SidebarProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default AppProvider
