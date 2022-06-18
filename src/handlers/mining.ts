import { ALLOWED_COINS, ALLOWED_COINS_STRING } from '@/constants'
import { calcMiningProfitInDollars } from '@/helpers/calcMiningProfitInDollars'
import { commandWrapper } from '@/helpers/commandWrapper'
import { createMiningQuery } from '@/models/MiningQuery'
import { getCachedMiningData } from '@/helpers/getCachedMiningData'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

const SECONDS_IN = {
  day: 24 * 60 * 60,
  week: 24 * 60 * 60 * 7,
  month: 24 * 60 * 60 * 30,
}

export const COIN_UNITS = {
  BTC: {
    units: 'TH/s',
    multiplier: 1000000000000,
  },
  LTC: {
    units: 'MH/s',
    multiplier: 1000000,
  },
  DOGE: {
    units: 'MH/s',
    multiplier: 1000000,
  },
  ETH: {
    units: 'MH/s',
    multiplier: 1000000,
  },
}

export const handleMining = commandWrapper(async (ctx: Context) => {
  const text = ctx.message?.text

  const params = text?.match(/^\/mining ([a-z]+) (\d+)$/i)

  if (!params) {
    return ctx.reply(
      ctx.i18n.t('miningInputError', { ALLOWED_COINS_STRING }),
      sendOptions(ctx)
    )
  }

  const ticker = params[1].toUpperCase()
  const megaHashCount = Number(params[2])

  if (!ALLOWED_COINS.includes(ticker)) {
    return ctx.reply(
      ctx.i18n.t('miningCoinError', { ALLOWED_COINS_STRING }),
      sendOptions(ctx)
    )
  }

  const coinData = await getCachedMiningData(ticker)

  if (!coinData) {
    await ctx.reply(ctx.i18n.t('unrecognizedError'))
    return
  }

  const [dayProfitDollars, dayProfitCrypto] = calcMiningProfitInDollars(
    coinData,
    megaHashCount,
    SECONDS_IN.day,
    ticker
  )

  const [weekProfitDollars, weekProfitCrypto] = calcMiningProfitInDollars(
    coinData,
    megaHashCount,
    SECONDS_IN.week,
    ticker
  )

  const [monthProfitDollars, monthProfitCrypto] = calcMiningProfitInDollars(
    coinData,
    megaHashCount,
    SECONDS_IN.month,
    ticker
  )

  await ctx.reply(
    ctx.i18n.t('miningResult', {
      dayProfitDollars,
      dayProfitCrypto,
      weekProfitDollars,
      weekProfitCrypto,
      monthProfitDollars,
      monthProfitCrypto,
      ticker,
      megaHashCount,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      units: COIN_UNITS[ticker].units,
    }),
    sendOptions(ctx)
  )

  await createMiningQuery({
    userId: ctx.dbuser.id,
    coin: ticker,
    hash: megaHashCount * 1000000,
    profit: dayProfitDollars,
  })
})
