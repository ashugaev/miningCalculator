import { COIN_UNITS } from '@/handlers/mining'
import { MiningData } from '@/api/getMiningData'

/**
 * @param {coinsData} - data from api
 * @param {hashCount} - Mega Hash count from user massage
 * @param {seconds} - Seconds if time period
 *
 * @returns - number of dollars ($)
 */
export const calcMiningProfitInDollars = (
  coinsData: MiningData,
  megaHashCount: number,
  seconds: number,
  ticker: string
): [number, number] => {
  const oneSecondIncomeCrypto =
    ((coinsData.reward *
      megaHashCount *
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      COIN_UNITS[ticker].multiplier) /
      60 /
      60) *
    seconds

  const incomeDollars = oneSecondIncomeCrypto * coinsData.price

  return [
    Number(incomeDollars.toFixed(2)),
    Number(oneSecondIncomeCrypto.toFixed(4)),
  ]
}
