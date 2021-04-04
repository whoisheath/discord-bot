exports.help = function(message) {
    const commands = ['help', 'ping', 'askJimmy', 'spam (must end in number)', "crypto", "coinprice"];

    message.channel.send(`All commands must begin with a ! \nHere are the commands: ${commands}`);
}