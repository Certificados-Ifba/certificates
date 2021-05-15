import * as bcrypt from 'bcrypt'
import { timeStamp } from 'console'
import * as mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

import { IUser } from '../interfaces/user.interface'

const SALT_ROUNDS = 10

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id
  delete ret.password
}

export const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },
    name: {
      type: String,
      required: [true, 'Name can not be empty']
    },
    email: {
      type: String,
      required: [true, 'Email can not be empty'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Email should be valid'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password can not be empty'],
      minlength: [6, 'Password should include at least 6 chars']
    },
    role: {
      type: String,
      enum: ['ADMIN', 'COORDINATOR', 'PARTICIPANT'],
      required: [true, 'Role can not be empty']
    },
    is_confirmed: {
      type: Boolean,
      required: [true, 'Confirmed can not be empty']
    },
    last_login: {
      type: Date
    },
    personal_data: {
      cpf: {
        type: String,
        minlength: [11, 'CPF must be 11 characters'],
        maxlength: [11, 'CPF must be 11 characters']
      },
      dob: {
        type: Date
      },
      phone: {
        type: String
      },
      is_student: {
        type: Boolean
      }
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

UserSchema.methods.getEncryptedPassword = (password: string) => {
  return bcrypt.hash(String(password), SALT_ROUNDS)
}

UserSchema.methods.compareEncryptedPassword = function (password: string) {
  return bcrypt.compare(password, this.password)
}

UserSchema.pre('save', async function (next) {
  const self = this as IUser
  if (!this.isModified('password')) {
    return next()
  }
  self.password = await self.getEncryptedPassword(self.password)
  next()
})
