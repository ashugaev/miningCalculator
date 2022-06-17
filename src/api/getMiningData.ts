import axios from 'axios'

export interface MiningData {
  id: string
  coin: string
  name: string
  type: string
  algorithm: string
  network_hashrate: number
  difficulty: number
  /**
   * Reward for one hash for one hour
   */
  reward: number
  reward_unit: string
  reward_block: number
  price: number
  volume: number
  updated: number
}

export const getMiningData = async (): Promise<MiningData[]> => {
  const { data } = await axios('https://api.minerstat.com/v2/coins')
  return data
}
