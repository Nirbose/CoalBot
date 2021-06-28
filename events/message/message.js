"use strict";

const Discord = require('discord.js');
require('discord-reply');
const config = require('../../config.json')
const prefix = config.prefix;
const axios = require('axios')
const dialogflow = require('dialogflow');
const uuid = require('uuid');
const dialogConfig = require('../../dialogConfig.json')
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database("./db/database.db")

let talking = []
let waiting;

module.exports = async (client, message) => {
	
	/////////////// Sauvegarde msg ////////

	let timestamp = message.createdTimestamp;;
	let author = message.author.id;
	let chan = message.channel.id;
	let mesId = message.id;
	let mes;
	let dataEmbed = []
	let dataIMG = [];
	for (let embed of message.embeds) {
		dataEmbed.push([`Title: ${embed.title} Author: ${embed.author} Description: ${embed.description} `])
		for (let field of embed.fields) {
		dataEmbed.push([`Field title: ${field.name} Field value: ${field.value}`])
		}
	}

	message.attachments.forEach(attachment => {
		let url = attachment.attachment;
		dataIMG.push([url])
	});

	if(dataEmbed.length != 0) {
		mes = dataEmbed
	} else if(dataIMG != 0){
		mes = dataIMG
	} else {
		mes = message.content
	}
	
	db.prepare(`INSERT INTO messages (message, messageID, channel, author, timestamp) VALUES(?, ?, ?, ?, ?)`, [mes, mesId, chan, author, timestamp], err => {
		if(err) {
			console.log(err);
		}
	}).run();

	////////////// End save msg ///////////

	/////////////// Auto moderation //////////////

	// axios.post('http://enzia.toile-libre.org/wordban/', {
	// 	word: 'Fred',
	// 	message: 'Flintstone'
	// })
	// .then(function (response) {
	// 	console.log(response);
	// })
	// .catch(function (error) {
	// 	console.log(error);
	// });

	/////////////// End Auto moderation //////////////

	/////////////// ChatBot ///////////////
	let input;
	db.all(`SELECT * FROM channels`, (err, rows) => {
		rows.forEach(channel => {
			if(channel.name == 'chatbot') {
				if (message.channel.id === channel.channelId && !message.author.bot) {
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
			}
		})
	})


	/////////////// Reaction Message ///////////////

	const hello = ['salut', 'yo', 'bonjour', 'bjr', 'hey', 'hello', 'helo'];

	const content = message.content.toLowerCase().trim();
	
	for (let index = 0; index < hello.length; index++) {
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