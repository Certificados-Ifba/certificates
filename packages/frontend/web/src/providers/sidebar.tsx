import { ReactNode, createContext, useState } from 'react'

export interface SidebarContextData {
  isActive: boolean
  toogleActive: () => void
}

interface SidebarProviderProps {
  children: ReactNode
}

export const SidebarContext = createContext({} as SidebarContextData)

const SidebarProvider = ({ children }: SidebarProviderProps): JSX.Element => {
  const [isActive, setIsActive] = useState(false)

  const toogleActive = () => {
    setIsActive(oldState => !oldState)
  }
  return (
    <>
      <SidebarContext.Provider value={{ isActive, toogleActive }}>
        {children}
      </SidebarContext.Provider>
    </>
  )
}

export default SidebarProvider
