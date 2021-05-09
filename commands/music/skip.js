const Discord = require('discord.js');
const {skip} = require('../../assets/function/music');

module.exports = {
    name: "skip",
    aliases: ['s', 'pass'],

    execute(message) {

        if(!message.member.voice.channel) return message.channel.send('Vous devez être connectez dans un voval pout effectuer cette commande.');

        skip(message);
    }
}