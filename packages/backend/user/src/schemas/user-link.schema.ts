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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User can not be empty']
    },
    is_used: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      default: generateLink()
    },
    expired: {
      type: Number,
      default: null
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
