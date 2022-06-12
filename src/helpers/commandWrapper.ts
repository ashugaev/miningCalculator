import Context from '@/models/Context'

// eslint-disable-next-line prettier/prettier
export function commandWrapper(
  callback: (ctx: Context) => Promise<unknown>
) {
  return async (ctx: Context) => {
    try {
      await callback(ctx)
    } catch (e) {
      void ctx.reply(ctx.i18n.t('unrecognizedError'))
      console.error('[COMMAND WRAPPER]', e)
    }
  }
}
