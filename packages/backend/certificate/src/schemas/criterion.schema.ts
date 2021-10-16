import { Schema } from 'mongoose'

export const CriterionSchema = new Schema({
  function: {
    type: Schema.Types.ObjectId,
    ref: 'Generic',
    required: [true, 'Function can not be empty']
  },
  type_activity: {
    type: Schema.Types.ObjectId,
    ref: 'Generic',
    required: [true, 'Type activity can not be empty']
  }
})
