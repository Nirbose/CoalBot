const Discord = require('discord.js');
let serverQueue;

module.exports = {
    name: "skip",
    description: "Commande permettant de passer la musique en cour.",
    aliases: ['s', 'pass'],
    categorie: "Music",
    execute(message) {

        if(!message.member.voice.channel) return message.channel.send('Vous devez être connectez dans un voval pout effectuer cette commande.');

        serverQueue = message.client.serverQueue;

        if(!serverQueue) {
            return message.channel.send('Aucune musique en cour.')
        }

        serverQueue.connection.dispatcher.end();
        message.channel.send("Musique skiper.")
    }
}