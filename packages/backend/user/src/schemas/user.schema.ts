import * as bcrypt from 'bcrypt'
import * as mongoose from 'mongoose'

import { IUser } from '../interfaces/user.interface'

const SALT_ROUNDS = 10

const formatCpf = (cpf: string): string =>
  cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')

const formatData = (value: string): string => {
  if (!value) return ''
  const data = new Date(value)
  const diaF = data.toISOString().substr(8, 2)
  const mesF = data.toISOString().substr(5, 2)
  const anoF = data.toISOString().substr(0, 4)
  return `${diaF}/${mesF}/${anoF}`
}

function transformValue(doc, ret: { [key: string]: any }) {
  if (ret?.personal_data?.cpf)
    ret.personal_data.cpf = formatCpf(ret.personal_data.cpf)
  if (ret?.personal_data?.dob)
    ret.personal_data.dob = formatData(ret.personal_data.dob)
  delete ret._id
  delete ret.password
}

export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      uppercase: true,
      trim: true,
      required: [true, 'Name can not be empty']
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'E-mail should be valid'
      ],
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      minlength: [6, 'Password should include at least 6 chars']
    },
    role: {
      type: String,
      enum: ['ADMIN', 'COORDINATOR', 'PARTICIPANT'],
      required: [true, 'Role can not be empty']
    },
    is_confirmed: {
      type: Boolean
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
      institution: {
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
