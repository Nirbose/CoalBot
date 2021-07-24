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

const usersMap = new Map();
const LIMIT = 7;
const DIFF = 5000;
const TIME = 3000;

module.exports = async (client, message) => {

	process.embedSuccessDefault = new Discord.MessageEmbed().setTitle('Succès !').setColor(process.successColor).setDescription('La commande a été exécutée avec succès !').setTimestamp();
	process.embedErrorDefault = new Discord.MessageEmbed().setColor(process.errorColor).setTitle('Erreur !').setTimestamp();


	/////////////// Anti Spam ///////////////
	if(usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;

        if(difference > DIFF) {
            clearTimeout(timer);
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
            }, TIME);
            usersMap.set(message.author.id, userData)
        }
        else {
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {

               	message.reply("Stop Spam !");

				let fn = setTimeout(() => {
					usersMap.delete(message.author.id);
				}, TIME);
				usersMap.set(message.author.id, {
					msgCount: 1,
					lastMessage : message,
					timer : fn
				});

              	message.channel.bulkDelete(LIMIT);
               
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
        }
    }
    else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
        }, TIME);
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage : message,
            timer : fn
        });
    }
	/////////////// End Anti Spam ///////////////


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

	db.all(`SELECT * FROM wordBanned`, (err, rows) => {
		rows.forEach(word => {

			let regex = new RegExp("("+ word.word +")([a-z]+)");
			let verifR = new RegExp("("+ word.word +")");
			let msgParse = message.content.replace(/(\*)/g, '').replace(/(\?)/g, '').replace(/(\.)/g, '').replace(/(\,)/g, '').replace(/(\/)/g, '').replace(/(\|)/g, '').toLowerCase();
			let msgContent = regex.exec(msgParse);
		
			if(verifR.exec(msgParse)) {
				if(!msgContent) {
					message.channel.send("No !")
				}
			}
		})
	})

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

	const hello = ['salut', 'yo', 'bonjour', 'bjr', 'hey', 'hello', 'helo', 'coucou'];

	const content = message.content.toLowerCase().trim();
	
	for (let index = 0; index < hello.length; index++) {
		if(content.includes(hello[index])) {
			message.react('👋');
		}
		
	}

	/////////////// End Reaction Message ///////////////

	// Handler
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if(command.isOwner) {
		if(!config.isOwner.includes(message.author.id)) return message.reply('Vous ne pouvez pas executer cette commande.');
	}

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('Je ne peux pas exécuter cette commande dans les DM!');
	}

	if (command.args && !args.length) {
		let reply = `Vous n'avez fourni aucun argument, ${message.author}!\n`;

		if (command.usage) {
			reply += `\nL'utilisation appropriée serait: \`\`\`${prefix}${command.name} ${command.usage}\`\`\`\n*[...]: obligatoire / (...): optionnel*`;
		}

		return message.channel.send(process.embedErrorDefault.setDescription(reply));
	}

	try {
		command.execute(message, args)
	} catch (error) {
		console.error(error);
		message.reply(process.embedErrorDefault.setDescription(`❌ Désolé, une erreur s'est produite lors de l'exécution de cette commande. \n \`\`\` ${error} \`\`\``));
	}

};