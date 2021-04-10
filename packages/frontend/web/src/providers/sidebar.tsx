import { ReactNode, createContext, useState, useEffect } from 'react'

export interface SidebarContextData {
  isActive: boolean
  isMobile: boolean
  toogleActive: () => void
  hideSidebar: () => void
}

interface SidebarProviderProps {
  children: ReactNode
}

export const SidebarContext = createContext({} as SidebarContextData)

const SidebarProvider = ({ children }: SidebarProviderProps): JSX.Element => {
  const [isActive, setIsActive] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const toogleActive = () => {
    setIsActive(isActive => !isActive)
  }
  const hideSidebar = () => {
    setIsActive(false)
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 769) {
        setIsActive(false)
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <SidebarContext.Provider
        value={{ isActive, isMobile, toogleActive, hideSidebar }}
      >
        {children}
      </SidebarContext.Provider>
    </>
  )
}

export default SidebarProvider
