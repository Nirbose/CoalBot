const Discord = require('discord.js');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database("./db/database.db")

module.exports = async (client, error) => {

    const embed = new Discord.MessageEmbed()
    .setColor(process.errorColor)
    .setTitle('Erreur !')
    .setDescription(`❌ Une erreur est survenue sur le bot ! \n \`\`\` ${error} \`\`\``)
    .setTimestamp()

    db.all(`SELECT * FROM channels`, (err, rows) => {
        find = false
        rows.forEach(channel => {
            if(find) {
                return;
            }
            if(channel.name == "log") {
                find = true;
                client.channels.cache.get(channel.channelId).send(embed)
            }
        })
    })
}