const Discord = require('discord.js');
const {pause} = require('../../assets/function/music');

module.exports = {
    name: "pause",
    description: "Commande permettant de mettre une musique en pause.",
    categorie: "Music",
    execute(message) {

        if(!message.member.voice.channel) return message.channel.send('Vous devez être connectez dans un vocal pout effectuer cette commande.');

        pause(message);
    }
}