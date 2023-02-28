import { ValidationError } from 'yup'

export interface IErrors {
  [key: string]: string
}

export const getValidationErrors = (err: ValidationError): IErrors => {
  const validationErrors: IErrors = {}

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message
  })

  return validationErrors
}
