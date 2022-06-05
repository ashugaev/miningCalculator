import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export const handleRoadmap = (ctx: Context) => {
  return ctx.replyWithLocalization('roadmap', sendOptions(ctx))
}
