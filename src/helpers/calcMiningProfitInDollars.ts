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
): number => {
  const oneSecondIncome =
    (coinsData.reward *
      megaHashCount *
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      COIN_UNITS[ticker].multiplier *
      coinsData.price) /
    60 /
    60

  return Number((oneSecondIncome * seconds).toFixed(2))
}
