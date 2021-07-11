const Discord = require('discord.js');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database("./db/database.db")

module.exports = client => {

    // DataBase
    db.prepare(`CREATE TABLE IF NOT EXISTS warn (id INTEGER, userId VACHAR(255), nb_warn INT, reason TEXT, PRIMARY KEY (id))`).run().finalize()
    db.prepare(`CREATE TABLE IF NOT EXISTS role (id INTEGER, messageId VACHAR(255), channelId VACHAR(255), emoji VACHAR(255), role VACHAR(255), menuId VACHAR(255), mode TEXT, PRIMARY KEY (id))`).run().finalize()
    db.prepare(`CREATE TABLE IF NOT EXISTS wordBanned (id INTEGER, word VACHAR(255), userId VACHAR(255), PRIMARY KEY (id))`).run().finalize()
    db.prepare(`CREATE TABLE IF NOT EXISTS bump (id INTEGER, userId VACHAR(255), date TEXT, PRIMARY KEY (id))`).run().finalize()
    db.prepare(`CREATE TABLE IF NOT EXISTS channels (id INTEGER, name VACHAR(255), channelId VACHAR(255), PRIMARY KEY (id))`).run().finalize()
    db.prepare(`CREATE TABLE IF NOT EXISTS stats (id INTEGER, year VACHAR(255), month VACHAR(255), joine INT, leave INT, PRIMARY KEY (id))`).run().finalize()
    db.prepare(`CREATE TABLE IF NOT EXISTS messages (id INTEGER, message VACHAR(255), messageID  VACHAR(255), channel VACHAR(255), author VACHAR(255), timestamp VACHAR(255), PRIMARY KEY (id))`).run().finalize()
    db.prepare(`CREATE TABLE IF NOT EXISTS invalidName (id INTEGER, userName VACHAR(255), userID VACHAR(255), PRIMARY KEY (id))`).run().finalize()
    db.close();

    client.user.setPresence({activity: {name: "CoalStudio.fr"}});
    console.log(
        `Le bot est ON !`
    );


    db.all(`SELECT * FROM channels`, (err, rows) => {
        find = false
        rows.forEach(channel => {
            if(find) {
                return;
            }
            if(channel.name == "log") {
                find = true;

                const embed = new Discord.MessageEmbed()
                .setColor(process.color)
                .setDescription('<a:9608loading:856616984111611965> **|  Loading**')

                client.channels.cache.get(channel.channelId).send(embed).then((msg) => {
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

