const Discord = require('discord.js');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database("./db/database.db");

module.exports = async (client, oldMember, newMember) => {

    let role = "";

    for(let i = 0; i < newMember._roles.length; i++) {
        role += `<@&${newMember._roles[i]}>`;
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
                .setTitle('Member Update :')
                .setDescription(`${newMember.user} vient d'update son profil`)
                .addFields(
                    {name: "Nickname :", value: newMember.nickname, inline: true},
                    {name: "Roles :", value: role}
                )
                .setThumbnail(newMember.user.avatarURL())
                .setTimestamp()

                find = true;
                return client.channels.cache.get(channel.channelId).send(embed);
            }
        })
    })
}