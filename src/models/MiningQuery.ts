import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

interface CreateMiningQueryParams {
  userId: number
  coin: string
  hash: number
  profit: number
}

@modelOptions({ schemaOptions: { timestamps: true } })
export class MiningQuery {
  @prop({ required: true })
  userId!: number
  @prop({ required: true })
  coin!: string
  @prop({ required: true })
  hash!: number
  @prop({ required: true })
  profit!: number
}

const MiningQueryModel = getModelForClass(MiningQuery)

export function createMiningQuery({
  userId,
  coin,
  hash,
  profit,
}: CreateMiningQueryParams) {
  return MiningQueryModel.create({ userId, coin, hash, profit })
}
