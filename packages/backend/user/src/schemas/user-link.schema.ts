import * as mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id
}

function generateLink() {
  return Math.random().toString(16).replace('0.', '')
}

export const UserLinkSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },
    user_id: {
      type: String,
      required: [true, 'User can not be empty']
    },
    is_used: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      default: generateLink()
    }
  },
  {
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: transformValue
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: transformValue
    }
  }
)
