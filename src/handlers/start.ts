import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export const handleStart = (ctx: Context) => {
  return ctx.replyWithLocalization('start', sendOptions(ctx))
}
