import { api } from '@services'
import { createContext, useState, useEffect } from 'react'

export interface ResumeContextData {
  events: number
  participants: number
  certificates: number
}

const initialValues = {
  events: 0,
  participants: 0,
  certificates: 0
}

interface IResponse {
  message: string
  data: ResumeContextData
}

export const ResumeContext = createContext({} as ResumeContextData)

export const ResumeProvider: React.FC = ({ children }): JSX.Element => {
  const [values, setValues] = useState<ResumeContextData>(initialValues)

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get<IResponse>('resume')
        setValues(response?.data?.data)
      } catch (err) {
        setValues(initialValues)
      }
    }
    loadData()
  }, [])

  return (
    <>
      <ResumeContext.Provider value={{ ...values }}>
        {children}
      </ResumeContext.Provider>
    </>
  )
}
