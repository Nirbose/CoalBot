const fs = require('fs');
const Discord = require('discord.js');

module.exports = async (client, message, channel) => {

    let rawdata = fs.readFileSync("./json/channel.json");
    let data = JSON.parse(rawdata);
    const embed = new Discord.MessageEmbed()
    .setColor("3C3C3A")
    .setAuthor(message.guild.name, message.guild.iconURL())
    .setDescription(`**Message de ${message.author} supprimé :** \n\n${message.content}`)
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()

    for(let i = 0; i < data.log_channel.length; i++) {
        if(message.client.channels.cache.get(data.log_channel[i])) {
            message.client.channels.cache.get(data.log_channel[i]).send(embed)
        }
        
    }

}