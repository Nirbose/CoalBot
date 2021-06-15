const Discord = require('discord.js');
const {resume} = require('../../assets/function/music');

module.exports = {
    name: "resume",
    description: "Commande permettant de redémarrer la musique.",
    categorie: "Music",
    execute(message) {

        if(!message.member.voice.channel) return message.channel.send('Vous devez être connectez dans un voval pout effectuer cette commande.');

        let serverQueue = message.client.serverQueue;

        if(!serverQueue) {
            return message.channel.send('Aucune musique en cour.')
        }

        if (!serverQueue.playing) {
			message.client.serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('Je reprend !');
		} else {
            return message.channel.send("▶ - La musique est déjà lancer.");
        }
    }
}