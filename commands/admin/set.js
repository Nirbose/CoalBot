const sqlite3 = require('sqlite3');
const db = new sqlite3.Database("./db/database.db");
channelsNames = ['public', 'chatbot', 'goodbye', 'welcome', 'logs', 'voice', 'rss'];

module.exports = {
    name: 'set',
    description: 'set Command',
    categorie: "👑 - Admin",
    args: true,
    usage: `[${channelsNames.toString().replace(/,/g, ' | ')}] (Channel ID)`,
    permition: "ADMINISTRATOR",
    execute(message, args) {
        let channelName = args[0].toLowerCase();
        let channelID;

        if(!args[1]) {
            channelID = message.channel.id;
        } else {
            channelID = args[1];
        }

        if(!message.client.channels.cache.get(channelID)) return message.channel.send("Ce channel n'existe point.");

        if(channelsNames.includes(channelName)) {
            db.prepare(`INSERT INTO specialChannels(flag, channelID, authorID, created_at) VALUES(?, ?, ?, datetime('now'))`, [channelName, channelID, message.author.id], err => {
                if(err) {
                    message.channel.send(`\`\`\` ${err} \`\`\``);
                }
            }).run()
    
            message.channel.send(process.embedSuccessDefault.addField('Channel :', ` \`\`\` ${message.channel.id} \`\`\` `))
        } else {
            message.channel.send(process.embedErrorDefault.setDescription('Le channel ne peux pas avoir le nom que vous lui avez donné.'));
        }

    }
}