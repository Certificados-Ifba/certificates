export interface ISides {
  top: string
  right: string
  bottom: string
  left: string
}

export interface IAlign {
  name: string
  value: string
}

export interface ILayout {
  padding: ISides
  vertical: IAlign
  horizontal: IAlign
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
