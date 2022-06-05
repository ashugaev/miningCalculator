import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export const handleHelp = (ctx: Context) => {
  return ctx.replyWithLocalization('help', sendOptions(ctx))
}
