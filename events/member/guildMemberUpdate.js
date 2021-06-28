const Discord = require('discord.js');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database("./db/database.db");

module.exports = async (client, oldMember, newMember) => {

    let count = 0
    // Check pseudo //
    if(/[^\u0000-\u007f]/.test(newMember.nickname) || newMember.nickname == null) {
		
        db.run(`INSERT INTO invalidName (userName, userID) VALUES (?,?)`, [newMember.nickname, newMember.id])
		db.all(`SELECT * FROM invalidName`, (err, rows) => {
            find = false;
            rows.forEach(element => {
                count += 1
            });
            newMember.setNickname(`PSEUDO INCORECT ${count}`)
        });
	}



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
                if(beforeRole == '') beforeRole = 'null'
                if(afterRole == '') afterRole = 'null'
                const embed = new Discord.MessageEmbed()
                .setColor('3C3C3A')
                .setAuthor(newMember.guild.name, newMember.guild.iconURL())
                .setTitle('Member Update :')
                .setDescription(`${newMember.user} vient d'update son profil`)
                .addFields(
                    {name: '\u200B', value: "Avant : "},
                    {name: "Nickname :", value: oldMember.nickname, inline: true},
                    {name: "Roles :", value: beforeRole, inline: true},

                    {name: '\u200B', value: "Après : "},
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