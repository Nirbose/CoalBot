const Discord = require('discord.js'),
    client = new Discord.Client({
        partials: ['MESSAGE', 'REACTION']
    }),
    config = require('./config.json'),
    fs = require('fs');

const {
    loadEvents,
    loadCommands
} = require("./util/loader");

client.commands = new Discord.Collection()

loadCommands(client);
loadEvents(client);

client.login(config.token)