const Discord = require('discord.js');
const {stop} = require('../../assets/function/music');

module.exports = {
    name: "stop",
    desctiption: "Commande permettant de couper la musique et celle qui suive.",
    categorie: "Music",
    execute(message) {

        if(!message.member.voice.channel) return message.channel.send('Vous devez être connectez dans un voval pout effectuer cette commande.');

        stop(message);
    }
}