// Import the discord.js module
const Discord = require("discord.js");

// import functions
const Ping = require('./commands/ping')
const EvePrice = require('./commands/eve-price');
const askJimmy = require('./commands/ask-jimmy');
const Spam = require('./commands/spam');
const Help = require('./commands/help');
const CoinPrice = require('./commands/coin-price');

// Create an instance of a Discord client
const client = new Discord.Client();

//auth token
const auth = require("./auth.json");

//prefix baby!
const prefix = "!";

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on("ready", () => {
  console.log("bot on");

  //send message to personal channel to let me know that the bot is on/off
  // let channel = client.channels.get("543811624213938186");
  // channel.send("bot here");
});

// Create an event listener for messages
client.on("message", (message) => {
  //exit and stop if prefix ain't here
  if (!message.content.startsWith(prefix)) return;
  //make sure the bot doesn't loop itself
  if (message.author.bot) return;

  //help commands
  if (message.content.startsWith(`${prefix}help`)) {
    Help.help(message);
  }

  //ping for some reason
  if (message.content.startsWith(`${prefix}ping`)) {
    Ping.Ping(message);  
  }

  //ping for some reason
  if (message.content.startsWith(`${prefix}askJimmy`)) {
    askJimmy.askJimmy(message);  
  }

  // eve price
  if (message.content.startsWith(`${prefix}eveprice`)) {
    EvePrice.evePrice(message)
  }

  //key feature, spam
  if (message.content.startsWith(`${prefix}spam`)) {
    Spam.Spam(message);
  }

  //bitcoin price, thanks coindesk
  if (message.content.startsWith(`${prefix}coinprice`)) {
    CoinPrice.coinPrice(message);
  }

  //don't buy crypto, kids
  if (message.content.startsWith(`${prefix}crypto`)) {
    message.channel.send("don't buy crypto kids, it's a scam");
  }
});

//speicifc word listeners
const everyone = "@everyone";

client.on("message", (message) => {
  //don't want to mention @everyone... that's just bad manners
  if (message.content.includes(everyone)) {
    message
      .delete()
      .then((msg) =>
        message.channel.send(
          `${msg.author.username} mentioned everyone, that's just bad manners, so I deleted the message.`
        )
      )
      .catch(console.error);
  }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(auth.token);
