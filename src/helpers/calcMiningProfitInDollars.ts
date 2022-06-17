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
  seconds: number
): number => {
  const oneSecondIncome =
    (coinsData.reward * megaHashCount * 1000000 * coinsData.price) / 60 / 60

  return oneSecondIncome * seconds
}
