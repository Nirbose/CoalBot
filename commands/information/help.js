const Discord = require("discord.js");

const config = require('../../config.json')
const prefix = config.prefix;

module.exports = {
    name: "help",
    description:"Affiche la liste de toute les commandes",
    categorie: "Information",
    execute(message, arg) {

        let noFind = 1;

        if(!arg[0]) {
            let categorie = "";
            let names = [];

            let commandsCount = 0;
            let categorieCount = 0;

            const embed = new Discord.MessageEmbed()
            .setColor(process.color)
            .setTitle("Help")
            .setDescription(`Voici toute les commandes que possède ${message.client.user.username}`)
            .setAuthor(message.guild.name, message.guild.iconURL())
            .addField('\u200B', '\u200B');

            message.client.commands.forEach(elements => {
                if(categorie != elements.categorie) {

                    if(names.length != 0) {
                        embed.addField(categorie, `**- **${names.toString().replace(/,/g, ', ')}`)
                        categorieCount++;
                        commandsCount += names.length;
                        names = [];
                    }
                    
                }
                names.push(elements.name);
                categorie = elements.categorie
            })
            embed.setFooter(`${commandsCount} commandes et ${categorieCount} catégories`)
            message.channel.send(embed);
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