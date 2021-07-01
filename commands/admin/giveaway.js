const Discord = require('discord.js');

module.exports = {
    name: "giveaway",
    description: "Commande de giveaway",
    execute(message) {
        // const embed =  new Discord.MessageEmbed()
        // .setColor('')

        console.log(process.memoryUsage());

        message.channel.send('okey');
    }
}