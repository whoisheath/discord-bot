const auth = require('../auth.json');
const got = require('got');

exports.coinPrice = async function(message) {
    const coin = message.content.slice(11);

    const url = `https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=USD,BTC&api_key=${auth.crypto_token}`

    const res = await got(url).json().catch((err) => {console.error(err)});

    if (res.response) {
        message.channel.send("Your ticker is wrong. Make sure it is capitalized and input correctly");
    } else (
        message.channel.send(`Prices for ${coin} \nPrice in USD: $${res.USD} \nPrice in BTC: ฿${res.BTC}`)
    )
}