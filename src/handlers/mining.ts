import { calcMiningProfitInDollars } from '@/helpers/calcMiningProfitInDollars'
import { getCachedMiningData } from '@/helpers/getCachedMiningData'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

const SECONDS_IN = {
  day: 24 * 60 * 60,
  week: 24 * 60 * 60 * 7,
  month: 24 * 60 * 60 * 30,
}

const ALLOWED_COINS = ['BTC', 'ETH', 'LTC']

export const handleMining = async (ctx: Context) => {
  const text = ctx.message?.text

  const params = text?.match(/^\/mining ([a-z]+) (\d+)$/i)

  if (!params) {
    return ctx.replyWithLocalization('miningInputError', sendOptions(ctx))
  }

  // (btc|ltc|eth)

  const ticker = params[1]
  const megaHashCount = Number(params[2])

  const coinData = await getCachedMiningData(ticker)

  const dayProfit = calcMiningProfitInDollars(
    coinData,
    megaHashCount,
    SECONDS_IN.day
  )
  const weekProfit = calcMiningProfitInDollars(
    coinData,
    megaHashCount,
    SECONDS_IN.week
  )
  const monthProfit = calcMiningProfitInDollars(
    coinData,
    megaHashCount,
    SECONDS_IN.month
  )

  //   return ctx.reply(dayProfit + ' ' + weekProfit + ' ' + monthProfit + ' $')
  return ctx.reply(
    ctx.i18n.t('miningResult', {
      dayProfit,
      weekProfit,
      monthProfit,
      megaHashCount,
    }),
    sendOptions(ctx)
  )
}
