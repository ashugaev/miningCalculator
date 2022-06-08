// TODO: подставить типы монеты
/**
 * @param {coinsData} - data from api
 * @param {hashCount} - Mega Hash count from user massage
 * @param {seconds} - Seconds if time period
 *
 * @returns - number of dollars ($)
 */
export const calcMiningProfitInDollars = (
  coinsData: any,
  megaHashCount: number,
  seconds: number
): number => {
  const networkHashRateSha256 = (coinsData.difficulty * Math.pow(2, 32)) / 144

  // const networkHashRateSha256 = 216000000000000000000;

  const megaHashForATimePeriod = megaHashCount * seconds
  const hashForATimePeriod = megaHashForATimePeriod * 1000000
  const revenueInCrypto = hashForATimePeriod / networkHashRateSha256
  const revenueInDollars = revenueInCrypto * coinsData.price
  const revenuePrecise = Number(revenueInDollars.toFixed(2))
  return revenuePrecise
}
