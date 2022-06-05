import Context from '@/models/Context'
import languageMenu from '@/menus/language'
import sendOptions from '@/helpers/sendOptions'
import axios from "axios";

export const handleMining = async (ctx: Context) => {
    const text = ctx.message?.text;

    const params = text?.match(/^\/(mining) ([btc|ltc|eth]) ([\d]+)$/);

    if(!params) {
        return ctx.replyWithLocalization('inputError', sendOptions(ctx))
    }

    const ticker = params[0];
    const count = Number(params[1]);

    const {data: respData} = await axios('https://api.minerstat.com/v2/coins');

    console.log('cts', ctx);


    const coinData = respData.filter((el: any )=> el.coin === ticker)[0];

    const secInDay = 24 * 60 * 60;
    const secInMonth = 30 * 24 * 60 * 60;

    const mhToH = count * 1000000*secInMonth;
    const rewardForMh = coinData.reward_block * mhToH;

    const networkHashRageSha256 = coinData.difficulty *Math.pow(2, 32) ;

    console.log(mhToH, rewardForMh, networkHashRageSha256)

    const mhRevenueInLtc = rewardForMh/networkHashRageSha256;

    return ctx.reply(mhRevenueInLtc + '$');

    // return ctx.replyWithLocalization('language', {
    //     ...sendOptions(ctx),
    //     reply_markup: languageMenu,
    // })
}
