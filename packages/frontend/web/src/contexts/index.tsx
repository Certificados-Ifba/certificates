import { ThemeProvider } from 'styled-components'

import theme from '../styles/theme'
import AuthProvider from './AuthContext'
import SidebarProvider from './SidebarContext'
import ToastProvider from './ToastContext'

const AppProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <ToastProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </ToastProvider>
    </AuthProvider>
  </ThemeProvider>
)

export default AppProvider
