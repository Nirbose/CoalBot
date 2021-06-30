const fs = require('fs');
const Discord = require('discord.js');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database("./db/database.db");

module.exports = async (client, message, channel) => {

    db.all(`SELECT * FROM channels`, (err, rows) => {

        rows.forEach(channel => {
            if(channel.name == 'logs') {
                const embed = new Discord.MessageEmbed()
                .setColor("3C3C3A")
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`**Message de ${message.author} supprimé :** \n\n${message.content}`)
                .setThumbnail(message.author.avatarURL())
                .setTimestamp()

                message.channel.send(embed);
            }
        })
    })

}