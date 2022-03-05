import { Schema } from 'mongoose'

import { LayoutSchema } from './layout.schema'

export const PageSchema = new Schema({
  type: {
    type: String,
    required: [true, 'Type can not be empty']
  },
  text: {
    type: String,
    required: [true, 'Text can not be empty']
  },
  image: {
    type: String,
    required: [true, 'Image can not be empty']
  },
  layout: {
    type: LayoutSchema,
    required: [true, 'Layout can not be empty']
  }
})
