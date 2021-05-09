const Discord = require('discord.js');
const {pause} = require('../../assets/function/music');

module.exports = {
    name: "pause",

    execute(message) {

        if(!message.member.voice.channel) return message.channel.send('Vous devez être connectez dans un voval pout effectuer cette commande.');

        pause(message);
    }
}