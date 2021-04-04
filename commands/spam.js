exports.Spam = function(message) {
    let spamCap = 10; // change this number at the number of times Jimmy Steve can respond
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