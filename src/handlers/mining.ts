import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'
import axios from "axios";
import {calcMiningProfitInDollars} from "@/helpers/calcMiningProfitInDollars";

const SECONDS_IN = {
    day: 24 * 60 * 60,
    week: 24 * 60 * 60 * 7,
    month: 24 * 60 * 60 * 30,
};

export const handleMining = async (ctx: Context) => {
    const text = ctx.message?.text;

    const params = text?.match(/^\/mining [a-z]+ (\d+)$/i);
    /**
     * params
     * 0 - это вся строка
     * 1 - название монеты
     * 2 - мощность
     */

    /**
     * Обработать ошбки
     * params === null - сообщение о том, что формат не правильный и подскажем какой должен быть
     *
     * params[1] это валидная монета из списка ALLWED_COINS (создать)
     */

    /**
     * TODO:
     * - обрезать цифры до 2-х симоволов после точки
     * - оформить сообщение 
     * - ошибки
     * - подключить свойю ф-цию
     */
    
    if(!params) {
        return ctx.replyWithLocalization('inputError', sendOptions(ctx))
    }

    // (btc|ltc|eth)

    const ticker = params[1];
    const count = Number(params[2]);

    const {data: respData} = await axios('https://api.minerstat.com/v2/coins');

    const coinData = respData.filter((el: any )=> el.coin === ticker.toUpperCase())[0];

    const dayProfit = calcMiningProfitInDollars(coinData, count, SECONDS_IN.day);
    const weekProfit = calcMiningProfitInDollars(coinData, count, SECONDS_IN.week);
    const monthProfit = calcMiningProfitInDollars(coinData, count, SECONDS_IN.month);

    return ctx.reply(dayProfit + ' ' + weekProfit + ' ' + monthProfit + ' $' );
}
