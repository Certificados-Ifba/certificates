import { ICertificateValid } from '@dtos'
import { createContext, useContext, useState } from 'react'

export interface ValidateContextData {
  certificate: ICertificateValid
  setCertificate: (certificate: ICertificateValid) => void
}

export const ValidateContext = createContext({} as ValidateContextData)

export const ValidateProvider: React.FC = ({ children }): JSX.Element => {
  const [certificate, setCertificate] = useState<ICertificateValid>(null)

  return (
    <ValidateContext.Provider value={{ certificate, setCertificate }}>
      {children}
    </ValidateContext.Provider>
  )
}

export const useValidate = (): ValidateContextData => {
  const context = useContext(ValidateContext)

  if (!context) {
    throw new Error('useValidate must be used within an ValidateProvider')
  }

  return context
}
