import { IParticipant } from './IParticipant'

export interface ICertificate {
  id?: string
  activity?: string
  function?: string
  participant?: IParticipant
  event?: string
  workload: number
  start_date: Date
  end_date: Date
  authorship_order?: string
  additional_field?: string
}

export interface ILayout {
  padding: string
  horizontal_padding: string
  vertical_padding: string
  position: string
  horizontal_position: string
  vertical_position: string
}

export interface IPage {
  type: 'frente' | 'verso'
  text: string
  image: string
  layout: ILayout
}

export interface ICriterion {
  type_activity_id: string
  function_id: string
}

export interface IModelCertificate {
  name: string
  pages: IPage[]
  criterions: ICriterion[]
}

// export interface ILayout {
//   img: string
//   text: string
// }

// export interface IRole {
//   number: number
//   activity: { name: string; id: string }
//   function: { name: string; id: string }
// }

// export interface ICertificate {
//   name: string
//   front: ILayout
//   verse?: ILayout
//   roles: IRole[]
//   edit?: boolean
//   id: string
//   confirmed?: boolean
// }
