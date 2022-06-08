import { commandWrapper } from '@/helpers/commandWrapper'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export const handleRoadmap = commandWrapper(async (ctx: Context) => {
  return await ctx.replyWithLocalization('roadmap', sendOptions(ctx))
})
