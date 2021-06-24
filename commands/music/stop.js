const Discord = require('discord.js');

module.exports = {
    name: "stop",
    desctiption: "Commande permettant de couper la musique et celle qui suive.",
    categorie: "Music",
    execute(message) {

        if(!message.member.voice.channel) return message.channel.send('Vous devez être connectez dans un voval pout effectuer cette commande.');

        let serverQueue = message.client.serverQueue;

        if(!serverQueue) {
            return message.channel.send('Aucune musique en cour.')
        }

        serverQueue.songs = [];
	    serverQueue.connection.dispatcher.end();
    }
}