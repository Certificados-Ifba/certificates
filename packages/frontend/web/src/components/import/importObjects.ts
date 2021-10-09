export interface Rows {
  values?: string[]
}

export interface Column {
  name: string
  color?: string
  key: string
  type: 'date' | 'number' | 'string'
}

export interface Enum {
  name: string
  color?: string
  values: string[]
}

export const column_value_enum = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7
}

export const value_column_enum = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

export const types = { string: 's', number: 'n', date: 's' }
