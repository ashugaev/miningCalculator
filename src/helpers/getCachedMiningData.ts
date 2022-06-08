import { MiningData } from '@/api/getMiningData'
import { getMiningData } from '@/api/getMiningData'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const NodeCache = require('node-cache')

const myCache = new NodeCache({ stdTTL: 60 })

export const getCachedMiningData = async (
  coin: string
): Promise<MiningData | null> => {
  let miningData: MiningData[] | undefined = myCache.get('miningData')

  if (miningData === undefined) {
    try {
      miningData = await getMiningData()
      myCache.set('miningData', miningData)
    } catch (e) {
      console.error('[GET CACHED MINING DATA]', e)
      return null
    }
  }

  const result = miningData.find(
    (el: MiningData) => el.coin === coin.toUpperCase()
  )
  return result === undefined ? null : result
}
