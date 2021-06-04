const fs = require('fs');
const Discord = require('discord.js');

module.exports = async (client, messageReaction, user) => {

    let rawdata = fs.readFileSync("./json/reactionRole.json");
    let data = JSON.parse(rawdata);

    //check if from bot

    const message = messageReaction.message;
    const member = message.guild.members.cache.get(user.id);

    if(user.bot) return;
    for (let index = 0; index < data.message.length; index++) {
        if(message.id == data.message[index].messageId && message.channel.id == data.message[index].channelId && messageReaction.emoji.name == data.message[index].emoji) {
            const role = message.guild.roles.cache.get(data.message[index].role)
            if(data.message[index].mode == 'retirer') {
                member.roles.add(role)
            } else {
                member.roles.remove(role)
            }
        }
    }
}