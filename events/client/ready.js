const Discord = require('discord.js');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database("./db/database.db")

module.exports = client => {

    // DataBase
    db.prepare(`CREATE TABLE IF NOT EXISTS warn (id INTEGER, userID VACHAR(255), warn INT, authorID VACHAR(255), lastReason TEXT, lastDate DATETIME, created_at DATETIME, PRIMARY KEY (id))`).run().finalize()
    db.prepare(`CREATE TABLE IF NOT EXISTS roles (id INTEGER, name VACHAR(255), roleID VACHAR(255), description TEXT, matchEmoji VACHAR(255), matchMessageID INT, authorID VACHAR(255), created_at DATETIME, PRIMARY KEY (id))`).run().finalize()
    db.prepare(`CREATE TABLE IF NOT EXISTS bannedWords (id INTEGER, word VACHAR(255), authorID VACHAR(255), created_at DATETIME, PRIMARY KEY (id))`).run().finalize()
    db.prepare(`CREATE TABLE IF NOT EXISTS specialChannels (id INTEGER, flag VACHAR(255), channelID VACHAR(255), authorID VACHAR(255), created_at DATETIME, PRIMARY KEY (id))`).run().finalize()
    db.prepare(`CREATE TABLE IF NOT EXISTS stats (id INTEGER, year VACHAR(255), month VACHAR(255), joine INT, leave INT, PRIMARY KEY (id))`).run().finalize()
    db.prepare(`CREATE TABLE IF NOT EXISTS messages (id INTEGER, authorID VACHAR(255), content TEXT, messageID  VACHAR(255), embeds TEXT, channelID VACHAR(255), created_at DATETIME, PRIMARY KEY (id))`).run().finalize()
    db.prepare(`CREATE TABLE IF NOT EXISTS invalidName (id INTEGER, userName VACHAR(255), userID VACHAR(255), PRIMARY KEY (id))`).run().finalize()

    
    // db.close();

    client.user.setPresence({activity: {name: "CoalStudio.fr"}});
    console.log(
        `Le bot est ON !`
    );


    db.all(`SELECT * FROM specialChannels`, (err, rows) => {
        find = false

        if(!rows) return;
        rows.forEach(channel => {
            if(find) {
                return;
            }
            if(channel.flag == "logs") {
                find = true;

                const embed = new Discord.MessageEmbed()
                .setColor(process.color)
                .setDescription('<a:9608loading:856616984111611965> **|  Loading**')

                client.channels.cache.get(channel.channelID).send(embed).then((msg) => {
                    setTimeout(function () {

                        const embed = new Discord.MessageEmbed()
                        .setColor(process.successColor)
                        .setTitle('Chargé')
                        .setDescription('Le bot est chargé !')

                        msg.edit(embed);
                    }, 2500)
                })
            }
        })
    })
}

