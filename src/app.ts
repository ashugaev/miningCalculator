import 'module-alias/register'
import 'reflect-metadata'
import 'source-map-support/register'

import { handleHelp } from '@/handlers/help'
import { handleMining } from '@/handlers/mining'
import { handleRoadmap } from '@/handlers/roadmap'
import { handleStart } from '@/handlers/start'
import { ignoreOld, sequentialize } from 'grammy-middlewares'
import { run } from '@grammyjs/runner'
import attachUser from '@/middlewares/attachUser'
import bot from '@/helpers/bot'
import configureI18n from '@/middlewares/configureI18n'
import i18n from '@/helpers/i18n'
import languageMenu from '@/menus/language'
import startMongo from '@/helpers/startMongo'

async function runApp() {
  console.log('Starting app...')
  // Mongo
  await startMongo()
  console.log('Mongo connected')
  bot
    // Middlewares
    .use(sequentialize())
    .use(ignoreOld())
    .use(attachUser)
    .use(i18n.middleware())
    .use(configureI18n)
    // Menus
    .use(languageMenu)
  // Commands
  bot.command(['help'], handleHelp)
  bot.command(['start'], handleStart)
  bot.command(['roadmap'], handleRoadmap)
  bot.command('mining', handleMining)

  // Errors
  bot.catch(console.error)

  // Start bot
  await bot.init()

  run(bot)
  console.info(`Bot ${bot.botInfo.username} is up and running`)
}

process.on('uncaughtException', function (err) {
  console.error('[UNHANDLED]', err)
})

void runApp()
