const Discord = require('discord.js');
const {pause} = require('../../assets/function/music');

module.exports = {
    name: "pause",
    description: "Commande permettant de mettre une musique en pause.",
    categorie: "Music",
    execute(message) {

        if(!message.member.voice.channel) return message.channel.send('Vous devez être connectez dans un vocal pout effectuer cette commande.');

        let serverQueue = message.client.serverQueue;

        if(!serverQueue) {
            return message.channel.send('Aucune musique en cour.')
        }

        if (serverQueue.playing) {
			message.client.serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause(true);
			return message.channel.send('⏸ - Le musique est en pause.');
		}
    }
}