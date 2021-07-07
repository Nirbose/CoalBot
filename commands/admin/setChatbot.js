const sqlite3 = require('sqlite3');
const db = new sqlite3.Database("./db/database.db");

module.exports = {
    name: "setchatbot",
    description: "Permet de définir un salon chatbot.",
    categorie: "👑 - Admin",
    execute(message, arg) {

        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous n'êtes pas Admin.")

        if(!message.client.channels.cache.get(message.channel.id)) return message.channel.send("Ce channel n'existe point.");

        db.prepare(`INSERT INTO channels(name, channelId) VALUES(?, ?)`, ["chatbot", message.channel.id], err => {
            if(err) {
                message.channel.send(`\`\`\` ${err} \`\`\``);
            }
        }).run()

        message.channel.send(process.embedSuccessDefault.addField('Channel :', ` \`\`\` ${message.channel.id} \`\`\` `));
    }
}