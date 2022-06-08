import { ALLOWED_COINS_STRING } from '@/constants'
import { commandWrapper } from '@/helpers/commandWrapper'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export const handleStart = commandWrapper(async (ctx: Context) => {
  return await ctx.reply(
    ctx.i18n.t('start', { ALLOWED_COINS_STRING }),
    sendOptions(ctx)
  )
})
