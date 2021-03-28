const fetch = require("node-fetch");

const eveItems = require('../evethings.json');

exports.evePrice = function (message) {
    let item = message.content.slice(9);
    let itemID = eveItems.find(thing => thing.name === item)
    console.log(itemID)
}