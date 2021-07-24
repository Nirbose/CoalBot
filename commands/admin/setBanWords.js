const fs = require('fs');
const {MessageEmbed} = require('discord.js');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/database.db')

module.exports = {
    name: "setbanwords",
    description: "Permet d'ajouter un mot a ban.",
    categorie: "👑 - Admin",
    permition: "ADMINISTRATOR",
    execute(message, arg) {

        if(!arg[0]) return message.channel.send("Il me faut un mot a ban.");

        let word = arg[0].toLowerCase();

        db.prepare(`INSERT INTO wordBanned(word, userId) VALUES(?, ?)`, [word, message.author.id]).run()

        const embed = process.embedSuccessDefault.addField('Mot enregistré :', ` \`\`\` ${word} \`\`\` `)

        message.channel.send(embed);

    }
}