const fs = require('fs');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database("./db/database.db");

module.exports = {
    name: "setlogs",
    description: "Permet de définir un channel ou les logs seront afficher.",
    categorie: "👑 - Admin",
    execute(message, arg) {

        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous n'êtes pas Admin.")

        if(!message.client.channels.cache.get(message.channel.id)) return message.channel.send("Ce channel n'existe point.");

        db.prepare(`INSERT INTO channels(name, channelId) VALUES(?, ?)`, ["log", message.channel.id], err => {
            if(err) {
                message.channel.send(`\`\`\` ${err} \`\`\``);
            }
        }).run()

        message.channel.send(process.embedSuccessDefault.addField('Channel :', ` \`\`\` ${message.channel.id} \`\`\` `))
    }
}