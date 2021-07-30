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

const rss = require('./app/util/rss');
const Rss = new rss(client);
Rss.flux('youtube');

require('discord-buttons')(client); 

// Client Discord
client.commands = new Discord.Collection()
client.music = new Map();
client.serverQueue;
client.voiceCreate = [];

// Process Node.js
process.color = 'DBC33B';
process.successColor = 'GREEN';
process.errorColor = 'RED';

loadCommands(client, __dirname + "/commands/");
loadEvents(client, __dirname + "/events/");

client.login(config.token)