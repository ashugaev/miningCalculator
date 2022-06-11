import { Context as BaseContext } from 'grammy'
import { DocumentType } from '@typegoose/typegoose'
import { I18nContext } from '@grammyjs/i18n/dist/source'
import { SessionData } from '@/app'
import { User } from '@/models/User'

class Context extends BaseContext {
  session!: SessionData
  readonly i18n!: I18nContext
  dbuser!: DocumentType<User>

  replyWithLocalization: this['reply'] = (text, other, ...rest) => {
    text = this.i18n.t(text)
    return this.reply(text, other, ...rest)
  }
}

export default Context
