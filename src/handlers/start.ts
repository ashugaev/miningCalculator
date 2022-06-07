import { ALLOWED_COINS_STRING } from '@/constants'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export const handleStart = (ctx: Context) => {
  return ctx.reply(
    ctx.i18n.t('start', { ALLOWED_COINS_STRING }),
    sendOptions(ctx)
  )
}
