import { UserRoles, findAllUsers } from '@/models/User'
import { commandWrapper } from '@/helpers/commandWrapper'
import { router } from '@/app'
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

const adsMessage = router.route('adsMessage')
adsMessage.on(
  'message:text',
  commandWrapper(async (ctx) => {
    const message = ctx.message?.text
    const users = await findAllUsers()
    let usersCount = 0
    for (const user of users) {
      try {
        await bot.api.sendMessage(user.id as number, message ?? '', {
          parse_mode: 'HTML',
        })
        usersCount++
      } catch (err) {
        console.error('[ADSMESSAGE ERROR]', err)
      }
    }
    await ctx.reply(
      ctx.i18n.t('adsMessagesSent', { usersCount }),
      sendOptions(ctx)
    )
    ctx.session.step = 'idle'
  })
)
