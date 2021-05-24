const Discord = require('discord.js');
const {resume} = require('../../assets/function/music');

module.exports = {
    name: "resume",
    description: "Commande permettant de redémarrer la musique.",
    categorie: "Music",
    execute(message) {

        if(!message.member.voice.channel) return message.channel.send('Vous devez être connectez dans un voval pout effectuer cette commande.');

        resume(message);
    }
}