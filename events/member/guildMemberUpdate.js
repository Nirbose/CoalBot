const Discord = require('discord.js');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database("./db/database.db");

module.exports = async (client, oldMember, newMember) => {

    let afterRole = "";
    let beforeRole = "";

    for(let i = 0; i < newMember._roles.length; i++) {
        afterRole += `<@&${newMember._roles[i]}>`;
    }

    for(let i = 0; i < oldMember._roles.length; i++) {
        beforeRole += `<@&${oldMember._roles[i]}>`;
    }

    db.all(`SELECT * FROM channels`, (err, rows) => {
        find = false

        rows.forEach(channel => {
            if(find) {
                return;
            }

            if(channel.name == "log") {
                const embed = new Discord.MessageEmbed()
                .setColor('3C3C3A')
                .setAuthor(newMember.guild.name, newMember.guild.iconURL())
                .setTitle('Member Update :')
                .setDescription(`${newMember.user} vient d'update son profil`)
                .addFields(
                    {name: '\u200B', value: "``` Avant : ```"},
                    {name: "Nickname :", value: oldMember.nickname, inline: true},
                    {name: "Roles :", value: beforeRole, inline: true},

                    {name: '\u200B', value: "``` Après : ```"},
                    {name: "Nickname :", value: newMember.nickname, inline: true},
                    {name: "Roles :", value: afterRole, inline: true},
                )
                .setThumbnail(newMember.user.avatarURL())
                .setTimestamp()

                find = true;
                return client.channels.cache.get(channel.channelId).send(embed);
            }
        })
    })
}