const fs = require('fs');
const Discord = require('discord.js');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database("./db/database.db")

module.exports = async (client, messageReaction, user) => {
    //check if from bot

    const message = messageReaction.message;
    const member = message.guild.members.cache.get(user.id);

    if(user.bot) return;
    db.all(`SELECT * FROM role`, (err, rows) => {
        rows.forEach(element => {
            if(message.id == element.messageId && message.channel.id == element.channelId && messageReaction.emoji.name == element.emoji) {
                const role = message.guild.roles.cache.get(element.role)
                if(element.mode == 'retirer') {
                    member.roles.add(role)
                } else {
                    member.roles.remove(role)
                }
            }
        })
    });
}