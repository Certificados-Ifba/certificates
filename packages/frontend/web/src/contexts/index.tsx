import { ThemeProvider } from 'styled-components'

import theme from '../styles/theme'
import AuthProvider from './authContext'
import SidebarProvider from './sidebarContext'
import ToastProvider from './toastContext'

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
