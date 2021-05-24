"use strict";

const config = require('../../config.json')
const prefix = config.prefix;
const Mee6LevelsApi = require("mee6-levels-api");
const Discord = require('discord.js');

module.exports = async (client, message) => {

	/////////////// Reaction Message ///////////////

	const hello = ['salut ', 'yo ', 'bonjour ', 'bjr ', 'hey ', 'hello ', 'helo '];

	const content = message.content.toLowerCase();
	
	for (let index = 0; index < hello.length; index++) {
		if(client.user.id == message.author.id) return;
		if(content.includes(hello[index])) {
			message.react('👋');
		}
		
	}

	/////////////// End Reaction Message ///////////////

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('Je ne peux pas exécuter cette commande dans les DM!');
	}

	if (command.args && !args.length) {
		let reply = `Vous n'avez fourni aucun argument, ${message.author}!`;

		if (command.usage) {
			reply += `\nL'utilisation appropriée serait: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		const embed = new Discord.MessageEmbed()
		.setColor('#3C3C3A')
		.addField(`**Désolé**`, `il y a eu une erreur en essayant d\'exécuter cette commande!`)
		.setTimestamp();
		message.reply(embed);
	}

};

/////////////////////// Test ///////////////////////

// Mention système.
// module.exports = async (client, message) => {

// 	if (message.channel.type === 'dm') {
// 		return;
// 	}

// 	let msg = message.content.toLowerCase();

// 	message.guild.roles.cache.forEach(role => {
// 		if(role.id == '805868500211335219') {
// 			role.members.forEach(member => {
// 				if(msg.includes(member.user.username.toLowerCase())) {
// 					member.send('Salut, tu as été mentioner par message.');
// 					message.react('😲');
// 				}
// 			});
// 		}
// 	});
// }