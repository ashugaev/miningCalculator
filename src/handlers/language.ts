import { commandWrapper } from '@/helpers/commandWrapper'
import Context from '@/models/Context'
import languageMenu from '@/menus/language'
import sendOptions from '@/helpers/sendOptions'

export const handleLanguage = commandWrapper(async (ctx: Context) => {
  return await ctx.replyWithLocalization('language', {
    ...sendOptions(ctx),
    reply_markup: languageMenu,
  })
})
