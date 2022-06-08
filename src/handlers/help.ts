import { commandWrapper } from '@/helpers/commandWrapper'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export const handleHelp = commandWrapper(async (ctx: Context) => {
  return await ctx.replyWithLocalization('help', sendOptions(ctx))
})
