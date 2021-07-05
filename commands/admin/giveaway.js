const Discord = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
    name: "giveaway",
    description: "Commande de giveaway",
    execute(message) {

        let style = 'grey';

        let times = 1;

        let time = new MessageButton()
        .setStyle(style)
        .setEmoji('🕐')
        .setID('time_func')

        let gift = new MessageButton()
        .setStyle(style)
        .setEmoji('🎁')
        .setID('gift_func')

        let number = new MessageButton()
        .setStyle(style)
        .setEmoji('➕')
        .setID('number_func')

        let valid = new MessageButton()
        .setStyle('green')
        .setEmoji('✔')
        .setLabel('Validé')
        .setID('valid_func')

        let cancel = new MessageButton()
        .setStyle('red')
        .setEmoji('❌')
        .setLabel('Annulé')
        .setID('cancel_func')

        let row = new MessageActionRow()
        .addComponent(time)
        .addComponent(gift)
        .addComponent(number)
        .addComponent(valid)
        .addComponent(cancel)

        const embed =  new Discord.MessageEmbed()
        .setColor(process.color)
        .setTitle('Giveaway !')
        .setDescription('Mode édition du giveaway, clicker sur les boutons pour éditer le Giveaway')
        .addFields(
            {name: "Temps", value: times, inline: true},
            {name: "Gain", value: 'Rien', inline: true},
            {name: 'Gagnant', value: '1', inline: true}
        )
        .setTimestamp()

        message.client.on('clickButton', async (button) => {
            console.log(button);
            button.channel.send("Mange t'es mort.")
        });
        

        message.channel.send({embed: embed, components: row })
    }
}