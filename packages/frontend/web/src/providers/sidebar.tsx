import { createContext, useState, useEffect } from 'react'

export interface SidebarContextData {
  isActive: boolean
  isMobile: boolean
  toggleActive: () => void
  hideSidebar: () => void
}

export const SidebarContext = createContext({} as SidebarContextData)

export const SidebarProvider: React.FC = ({ children }): JSX.Element => {
  const [isActive, setIsActive] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const toggleActive = () => {
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
        value={{ isActive, isMobile, toggleActive, hideSidebar }}
      >
        {children}
      </SidebarContext.Provider>
    </>
  )
}
