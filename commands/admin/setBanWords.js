const fs = require('fs');

module.exports = {
    name: "setbanwords",
    description: "Permet d'ajouter un mot a ban.",
    categorie: "👑 - Admin",
    execute(message, arg) {

        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous n'êtes pas Admin.")

        if(!arg[0]) return message.channel.send("Il me faut un mot a ban.");

        let word = arg[0].toLowerCase()

        let rawdata = fs.readFileSync("./json/moderation.json");
        let data = JSON.parse(rawdata);

        for(let i = 0; i < data.bans_words.length; i++) {
            if(word == data.bans_words[i]) {
                return message.channel.send("Se mot est déjà enregistrer.")
            }
        }

        data.bans_words.push(arg[0]);

        let push = JSON.stringify(data, null, 2);
        fs.writeFile('./json/moderation.json', push, (err) => {
            if (err) throw err;
        });

        message.channel.send("Mot enregistrer.");

    }
}