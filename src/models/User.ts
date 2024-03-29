import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

export enum UserRoles {
  default = 'default',
  admin = 'admin',
}

@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @prop({ required: true, index: true, unique: true })
  id!: number
  @prop({ required: true, default: 'ru' })
  language!: string
  @prop({ required: true, default: UserRoles.default })
  role!: UserRoles
}

const UserModel = getModelForClass(User)

export function findOrCreateUser(id: number) {
  return UserModel.findOneAndUpdate(
    { id },
    {},
    {
      upsert: true,
      new: true,
    }
  )
}

export function findAllUsers() {
  return UserModel.find()
}
