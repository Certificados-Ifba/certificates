import * as mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id
}

export const TokenSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: [true, 'IP not be empty'],
      match: [
        /((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}/,
        'IP should be valid'
      ]
    },
    device: {
      type: String,
      required: [true, 'Device not be empty']
    },
    where: {
      type: String,
      default: ''
    },
    token: {
      type: String,
      required: [true, 'Token can not be empty']
    },
    destroyed: {
      type: Boolean,
      default: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User can not be empty']
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
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
