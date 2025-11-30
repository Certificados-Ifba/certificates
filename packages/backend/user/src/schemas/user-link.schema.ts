import * as mongoose from 'mongoose'

import { securePassword } from '../utils/generators'

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id
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
      default: securePassword()
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
