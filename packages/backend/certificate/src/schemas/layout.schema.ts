import { Schema } from 'mongoose'

export const LayoutSchema = new Schema({
  padding: {
    type: String,
    required: [true, 'Padding can not be empty']
  },
  horizontal_padding: {
    type: Number,
    required: [true, 'Horizontal padding can not be empty']
  },
  vertical_padding: {
    type: Number,
    required: [true, 'Vertical padding can not be empty']
  },
  position: {
    type: String,
    required: [true, 'Position can not be empty']
  },
  horizontal_position: {
    type: Number,
    required: [true, 'Horizontal position can not be empty']
  },
  vertical_position: {
    type: Number,
    required: [true, 'Vertical position can not be empty']
  }
})
