import 'module-alias/register'
import 'reflect-metadata'
import 'source-map-support/register'

import { Router } from '@grammyjs/router'
import { handleHelp } from '@/handlers/help'
import { handleMining } from '@/handlers/mining'
import { handleRoadmap } from '@/handlers/roadmap'
import { handleStart } from '@/handlers/start'
import { ignoreOld, sequentialize } from 'grammy-middlewares'
import { run } from '@grammyjs/runner'
import { session } from 'grammy'
import Context from '@/models/Context'
import attachUser from '@/middlewares/attachUser'
import bot from '@/helpers/bot'
import configureI18n from '@/middlewares/configureI18n'
import i18n from '@/helpers/i18n'
import languageMenu from '@/menus/language'
import startMongo from '@/helpers/startMongo'

export interface SessionData {
  step: 'idle' | 'adsMessage'
}

export const router = new Router<Context>((ctx) => ctx.session.step)
import { handleAds } from '@/handlers/ads'
async function runApp() {
  console.log('Starting app...')
  await startMongo()
  console.log('Mongo connected')
  bot
    .use(sequentialize())
    .use(ignoreOld())
    .use(attachUser)
    .use(i18n.middleware())
    .use(configureI18n)
    .use(session({ initial: (): SessionData => ({ step: 'idle' }) }))
    .use(router)
    .use(languageMenu)

  bot.command(['help'], handleHelp)
  bot.command(['start'], handleStart)
  bot.command(['roadmap'], handleRoadmap)
  bot.command(['mining'], handleMining)
  bot.command(['ads'], handleAds)

  bot.catch((e) => {
    console.error('[UNHANDLED APP ERROR]', e)
  })

  await bot.init()

  run(bot)
  console.info(`Bot ${bot.botInfo.username} is up and running`)
}

process.on('uncaughtException', function (err) {
  console.error('[UNHANDLED]', err)
})

void runApp()
