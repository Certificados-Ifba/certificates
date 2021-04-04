import * as mongoose from 'mongoose'

import { IEvent } from '../interfaces/event.interface'

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id
}

export const EventSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: [true, 'User can not be empty']
    },
    name: {
      type: String,
      required: [true, 'Name can not be empty']
    },
    description: String,
    initials: String,
    year: {
      type: String,
      required: [true, 'Year can not be empty']
    },
    edition: {
      type: String,
      required: [true, 'Edition can not be empty']
    },
    start_date: {
      type: Date,
      required: [true, 'Start date can not be empty']
    },
    end_date: {
      type: Date,
      required: [true, 'End date can not be empty']
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

EventSchema.pre('validate', function (next) {
  const self = this as IEvent

  if (this.isModified('user_id') && self.created_at) {
    this.invalidate('user_id', 'The field value can not be updated')
  }
  next()
})
