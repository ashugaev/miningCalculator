import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export const handleHelp = (ctx: Context) => {
  console.log(ctx?.from?.id)

  return ctx.replyWithLocalization('help', sendOptions(ctx))
}
