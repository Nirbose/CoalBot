const Discord = require('discord.js');
const fs = require('fs');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/database.db');

module.exports = {
    name: "warn_remove",
    description: "Permet de retirer 1 warn.",
    aliases: ["remove_warn"],
    categorie: "Moderation",
    execute(message, args) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send("Spécifier un utilisateur s'il vous plaît.");

        if(!member) return message.channel.send("Je ne trouve pas l'utilisateur.");

        if(member.id === message.author.id) return message.channel.send("Vous ne pouvez pas vous auto warn_remove.");

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Pas de raison';

        let find = false;

        db.all(`SELECT * FROM warn`, (err, rows) => {

            rows.forEach(element => {
                if(element.userId == member.id) {
                    db.prepare(`UPDATE warn SET nb_warn = ${element.nb_warn -= 1} WHERE id = ${element.id}`).run()

                    const embed = new Discord.MessageEmbed()
                    .setColor(process.color)
                    .setTitle('Warn Remove')
                    .addFields(
                        {name: 'User Warn Remove', value: `${member}`},
                        {name: 'Warn Remove par', value: `${message.author}`},
                        {name: 'Raison', value: `${reason}`},
                        {name: "Nombre de Warn :", value: `${element.nb_warn}`}
                    )
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()

                    message.channel.send(embed)

                    return find = true;
                }
            });

        });

        if(find) {
            return;
        }
        message.channel.send("L'utilisateur n'existe pas.");
    }
}