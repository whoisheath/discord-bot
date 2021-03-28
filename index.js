// Import the discord.js module
const Discord = require("discord.js");

//neat, fetch api isn't implemented in node yet, there's an NPM package for that
const fetch = require("node-fetch");

// import functions
const Ping = require('./commands/ping')
const EvePrice = require('./commands/eve-price');

// Create an instance of a Discord client
const client = new Discord.Client();

//auth token
const auth = require("./auth.json");

//prefix baby!
const prefix = "!";
let spamCap = 10; // change this number at the number of times Jimmy Steve can respond

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
    message.channel.send(
      "Commands: \n!ping \n!spam (must end with a number) \n!bitcoin \n!crypto"
    );
  }

  //ping for some reason
  if (message.content.startsWith(`${prefix}ping`)) {
    Ping.Ping(message);  
  }

  // eve price
  if (message.content.startsWith(`${prefix}eveprice`)) {
    EvePrice.evePrice(message)
  }

  //key feature, spam
  if (message.content.startsWith(`${prefix}spam`)) {
    let spamMessage = message.content;
    let stringNumMessage = spamMessage.slice(
      Math.max(spamMessage.length - 2, 1)
    );
    if (isNaN(stringNumMessage)) {
      message.channel.send("your spam command must end with a number...");
    } else if (stringNumMessage > spamCap) {
      // cap spam at certain level
      message.channel.send(
        `${stringNumMessage} is too many spams. Lower your number of spams to be able to use this command. 10 is the max.`
      );
    } else {
      for (let i = 0; i < parseInt(stringNumMessage); i++) {
        message.channel.send(message.content);
      }
    }
  }

  //bitcoin price, thanks coindesk
  if (message.content.startsWith(`${prefix}bitcoin`)) {
    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((res) => res.json())
      .then((price) =>
        message.channel
          .send(
            `The price of bitcoin is $${price.bpi.USD.rate} as of ${price.time.updateduk}`
          )
          .catch((err) => console.log(err))
      );
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
