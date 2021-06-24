const fs = require("fs");
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database("./db/database.db");

module.exports = {
    name: "setvoice",
    description: "Permet d'ajout un générateur de vocaux.",
    categorie: "👑 - Admin",
    execute(message, arg) {

        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous n'êtes pas Admin.")

        let id = arg[0];

        if(!id) return message.channel.send("Il me faut l'id d'un vocal.");
        if(isNaN(id)) return message.channel.send("L'id doit être composer de chiffres.")

        if(!message.client.channels.cache.get(id)) return message.channel.send("Ce channel n'existe point.")

        let find = false;

        db.all(`SELECT * FROM channels`, (err, rows) => {
            rows.forEach(channel => {
                if(channel.channelId == id) {
                    find = true;
                    return
                }
            })
        })

        if(find == false) {
            db.prepare(`INSERT INTO channels(name, channelId) VALUES(?, ?)`, ['voice', id]).run();
        }

        message.channel.send("Channel bien sauvegarder.")

    }
}