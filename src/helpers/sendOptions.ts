import Context from '@/models/Context'

export default function sendOptions(ctx: Context) {
  return {
    parse_mode: 'HTML' as const,
  }
}
