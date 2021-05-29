const fs = require('fs');

module.exports = {
    name: "setlogs",
    description: "Permet de définir un channel ou les logs seront afficher.",
    categorie: "Admin",
    execute(message, arg) {

        if(!arg[0]) return message.channel.send("Il me faut l'id d'un channel.");
        if(isNaN(arg[0])) return message.channel.send("L'id doit être composer de chiffres.")

        if(!message.client.channels.cache.get(arg[0])) return message.channel.send("Ce channel n'existe point.")

        let rawdata = fs.readFileSync("./json/channel.json");
        let data = JSON.parse(rawdata);

        for(let i = 0; i < data["log_channel"].length; i++) {
            if(arg[0] == data["log_channel"][i]) {
                return message.channel.send("Le channel est déjà enregistrer.")
            }
        }

        data.log_channel.push(arg[0])

        let push = JSON.stringify(data, null, 2);
        fs.writeFile('./json/channel.json', push, (err) => {
            if (err) throw err;
        });

        message.channel.send("Channel bien sauvegarder.")
    }
}