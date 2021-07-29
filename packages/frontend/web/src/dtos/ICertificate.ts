export interface ILayout {
  img: string
  text: string
}

export interface IRole {
  number: number
  activity: { name: string; id: string }
  function: { name: string; id: string }
}

export interface ICertificate {
  name: string
  front: ILayout
  verse?: ILayout
  roles: IRole[]
  edit?: boolean
}
