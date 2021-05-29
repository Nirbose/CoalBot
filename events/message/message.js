"use strict";

const fs = require('fs');
const Discord = require('discord.js');
require('discord-reply');
const config = require('../../config.json')
const prefix = config.prefix;
const Mee6LevelsApi = require("mee6-levels-api");
const dialogflow = require('dialogflow');
const uuid = require('uuid');
const dialogConfig = require('../../dialogConfig.json')

let talking = []
let waiting;

module.exports = async (client, message) => {

	/////////////// ChatBot ///////////////
	let input;
	let rawdata = fs.readFileSync('./json/channel.json');
    let json_channel = JSON.parse(rawdata);
	if (message.channel.id === json_channel.chatbot.channel_id && !message.author.bot) {
		clearTimeout(waiting);
		if(message.mentions.has(client.user.id) && !talking.includes(message.author.username)) {
			talking.push(message.author.username)
		}
		
		waiting = setTimeout(() => {
			talking = talking.filter(function(f) { return f !== message.author.username })
		}, 10000);

		input = message.content
		
		async function runSample(projectId = dialogConfig.project_id) {
			const sessionId = uuid.v4();
		   
			const sessionClient = new dialogflow.SessionsClient({
				keyFilename: './dialogConfig.json'
			});
			const sessionPath = sessionClient.sessionPath(projectId, sessionId);

			const request = {
			  session: sessionPath,
			  queryInput: {
				text: {
				  text: input,
				  languageCode: 'fr-FR',
				},
			  },
			};

			const responses = await sessionClient.detectIntent(request);
			const result = responses[0].queryResult;
			message.channel.startTyping()
			setTimeout(function(){
				message.channel.stopTyping();
				message.lineReply(`${result.fulfillmentText}`);
			}, 800);
		}
		if(talking.includes(message.author.username)) runSample();
	}


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