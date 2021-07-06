const { DiscordTogether } = require('discord-together');
const Discord = require('discord.js');
const { MessageButton, MessageActionRow, InteractionReply } = require('discord-buttons');

module.exports = {
    name: "together",
    description: "Permet de jouer/regarder quelque chose ensemble.",
    categorie: "Fun",
    execute(message) {

        if(!message.member.voice.channel) return message.channel.send('Il faut se trouver dans un channel vocal !');
        
        message.client.discordTogether = new DiscordTogether(message.client);

        let listing = [
            {
                name: "youtube",
                emoji: "❤"
            },
            {
                name: "chess",
                emoji: "🧡"
            }, 
            {
                name: "poker",
                emoji: "💛"
            }, 
            {
                name: "betrayal",
                emoji: "💚"
            }, 
            {
                name: "fishing",
                emoji: "💙"
            }
        ];
        let row = new MessageActionRow();

        const embed = new Discord.MessageEmbed()
        .setTitle('Together')
        .setDescription('Sélectionnez le jeu que vous voulez !')
        .setColor(process.color)
        .setTimestamp()

        listing.forEach(b => {
            let button = new MessageButton()
            .setStyle('grey')
            .setLabel(b.name)
            .setEmoji(b.emoji)
            .setID(b.name)

            row.addComponents(button);
        });

        message.channel.send({ embed: embed, components: row }).then(msg => {
            message.client.on('clickButton', async (button) => {
                if(button.clicker.user.bot) return;

                button.reply.defer()
    
                message.client.discordTogether.createTogetherCode(message.member.voice.channelID, button.id).then(async invite => {
    
                    const embed = new Discord.MessageEmbed()
                    .setTitle('Together')
                    .setDescription(`[Click ici](${invite.code}) pour jouer a au jeu que tu as sélectionné ! \n Bonne partie`)
                    .setColor(process.color)
                    .setTimestamp()
    
                    msg.edit({embed: embed, components: []});
                });
            });
        })

    }
}