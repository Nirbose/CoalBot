const fs = require('fs');
const Discord = require('discord.js')

const sqlite3 = require('sqlite3');
let db = new sqlite3.Database("./db/database.db")

module.exports = {
    name: "warn",
    description:"Permet de mettre un avertissement",
    categorie: "Moderation",
    execute(message, args) {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send("Spécifier un utilisateur s'il vous plaît.");

        if(!member) return message.channel.send("Je ne trouve pas l'utilisateur.");

        if(member.id === message.author.id) return message.channel.send("Vous ne pouvez pas vous auto warn.");

        let reason = args.slice(1).join(" ");

        if(!reason) { reason = 'Pas de raison';}

        db.all(`SELECT * FROM warn`, (err, rows) => {
            let find = false;

            rows.forEach(element => {
                if(element.userId ==  member.id) {

                    // Code
                    db.run(`UPDATE warn SET nb_warn = ${element.nb_warn+=1}, reason = '${reason}' WHERE id = ${element.id}`)
                    
                    // Embed
                    const embed = new Discord.MessageEmbed()
                    .setColor('#3C3C3A')
                    .setTitle('Warn')
                    .addFields(
                        {name: 'User Warn', value: `${member}`},
                        {name: 'Warn par', value: `${message.author}`},
                        {name: 'Raison', value: `${reason}`},
                        {name: "Nombre de Warn :", value: `${element.nb_warn}`}
                    )
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
            
                    message.channel.send(embed)


                    return find = true;
                }
            });

            if(find) {
                return;
            }

            db.prepare(`INSERT INTO warn(userId, nb_warn, reason) VALUES(?, ?, ?)`, [member.id, 1, reason], err => {
                if(err) {
                    console.log(err);
                }

                    // Embed
                    const embed = new Discord.MessageEmbed()
                    .setColor('#3C3C3A')
                    .setTitle('Warn')
                    .addFields(
                        {name: 'User Warn', value: `${member}`},
                        {name: 'Warn par', value: `${message.author}`},
                        {name: 'Raison', value: `${reason}`},
                        {name: "Nombre de Warn :", value: `1`}
                    )
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
            
                    message.channel.send(embed)


                    return find = true;

            }).run()
        })

    }
}