const Discord = require('discord.js');
const {resume} = require('../../assets/function/music');

module.exports = {
    name: "resume",

    execute(message) {

        if(!message.member.voice.channel) return message.channel.send('Vous devez être connectez dans un voval pout effectuer cette commande.');

        resume(message);
    }
}