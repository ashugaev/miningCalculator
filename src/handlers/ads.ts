import { Router } from '@grammyjs/router'
import { UserRoles } from '@/models/User'
import { commandWrapper } from '@/helpers/commandWrapper'
import Context from '@/models/Context'
import bot from '@/helpers/bot'
import sendOptions from '@/helpers/sendOptions'

export const handleAds = commandWrapper(async (ctx: Context) => {
  if (ctx.dbuser.role === UserRoles.default) {
    return null
  }
  ctx.session.step = 'adsMessage'
  return await ctx.replyWithLocalization('help', sendOptions(ctx))
})
const router = new Router<Context>((ctx) => ctx.session.step)
const adsMessage = router.route('adsMessage')
adsMessage.on('message:text', (ctx) => {
  console.log('kek,', ctx)
})
