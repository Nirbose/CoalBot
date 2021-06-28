const fs = require('fs');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/database.db')

module.exports = {
    name: "setbanwords",
    description: "Permet d'ajouter un mot a ban.",
    categorie: "👑 - Admin",
    execute(message, arg) {

        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous n'êtes pas Admin.")

        if(!arg[0]) return message.channel.send("Il me faut un mot a ban.");

        let word = arg[0].toLowerCase()

        db.prepare(`INSERT INTO wordBanned(word, userId) VALUES(?, ?)`, [word, message.author.id]).run()

        message.channel.send("Mot enregistrer.");

    }
}