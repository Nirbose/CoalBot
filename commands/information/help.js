const Discord = require("discord.js");

const config = require('../../config.json')
const prefix = config.prefix;

let count = 0;
let maxCount = 3;
let objCommand = {};
let arrayCategory = [];
let categories = [];

module.exports = {
    name: "help",
    description:"Affiche la liste de toute les commandes",
    categorie: "Information",
    execute(message, arg) {

        let noFind = 1;

        if(!arg[0]) {

            const embed = new Discord.MessageEmbed()
            .setColor(process.color)
            .setTitle("Help")
            .setDescription(`Voici toute les commandes que possède ${message.client.user.username}`)
            .setAuthor(message.guild.name, message.guild.iconURL())
            .addField('\u200B', '\u200B');

            message.client.commands.forEach(command => {
                if(objCommand[command.categorie]) {
                    objCommand[command.categorie].push(command.name)
                } else {
                    objCommand[command.categorie] = [command.name]
                    categories.push(command.categorie);
                }
            });

            arrayCategory = categories;
            result = arrayCategory.slice(count, maxCount);

            for (let i = 0; i < result.length; i++) {
                const element = result[i];
                embed.addField(element, '➜'+objCommand[element].toString().replace(/,/g, '\n➜'), true)
            }
            
            // embed.setFooter(`${commandsCount} commandes et ${categorieCount} catégories`)
            message.channel.send(embed).then(msg => {
                msg.react('◀');
                msg.react('▶');

                msg.client.on('messageReactionAdd', async (reaction, user) => {
                    if (user.bot) return;

                    arrayCategory = categories;

                    const newEmbed = new Discord.MessageEmbed()
                    .setColor(process.color)
                    .setTitle("Help")
                    .setDescription(`Voici toute les commandes que possède ${message.client.user.username}`)
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .addField('\u200B', '\u200B');

                    reaction.users.remove(user.id)

                    if(reaction.emoji.name == '◀') {
                        if(count == 0) return;

                        count -= 3;
                        maxCount -= 3;
                    } else if(reaction.emoji.name == '▶') {
                        count += 3;

                        if(count >= arrayCategory.length) return count -= 3;

                        maxCount += 3;

                    }

                    result = arrayCategory.slice(count, maxCount);
                    console.log(arrayCategory);

                    for (let i = 0; i < result.length; i++) {
                        const element = result[i];
                        newEmbed.addField(element, '➜'+objCommand[element].toString().replace(/,/g, '\n➜'), true)
                    }

                    await msg.edit(newEmbed);
                });
            })
        }

        if(arg) {
            const commandName = arg.join(' ');

            message.client.commands.forEach(element => {
                if(element['name'] == commandName) {
                    noFind = 0;

                    const embed = new Discord.MessageEmbed()
                    .setColor(process.color)
                    .setTitle(`Info sur la commande *${commandName}*`)
                    .setDescription(`Les commandes s'utilisent en envoyant simplement la commande comme un message, ajouter simplement ${prefix} devant. \n Rien de plus simple !`)
                    .addField(`:information_source: ${element['categorie']} \n`, `**${prefix}${element['name']}** : ${element['description']}` )
                    .setTimestamp()
                    if(element['aliases']) {
                        embed.addField("Alias :", `*${element['aliases']}* `)
                    }
                    
                    message.channel.send(embed)
                }
            });

        }

    }
}