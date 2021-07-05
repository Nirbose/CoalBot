const Discord = require('discord.js'),
    client = new Discord.Client({
        partials: ['MESSAGE', 'REACTION']
    }),
    config = require('./config.json'),
    fs = require('fs');

const {
    loadEvents,
    loadCommands
} = require("./app/util/loader");

require('discord-buttons')(client); 

// Client Discord
client.commands = new Discord.Collection()
client.music = new Map();
client.serverQueue;
client.voiceCreate = [];

// Process Node.js
process.color = '3C3C3A';
process.successColor = '';
process.errorColor = '';

loadCommands(client, __dirname + "/commands/");
loadEvents(client, __dirname + "/events/");

client.login(config.token)