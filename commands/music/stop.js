const Discord = require('discord.js');
const {stop} = require('../../assets/function/music');

module.exports = {
    name: "stop",

    execute(message) {

        if(!message.member.voice.channel) return message.channel.send('Vous devez être connectez dans un voval pout effectuer cette commande.');

        stop(message);
    }
}