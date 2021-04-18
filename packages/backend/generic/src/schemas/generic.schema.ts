import * as mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id
}

export const GenericSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },
    type: {
      type: String,
      required: [true, 'Type can not be empty']
    },
    name: {
      type: String,
      required: [true, 'Name can not be empty']
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
