const fs = require("fs")

module.exports = {
    name: "setvoice",
    description: "Permet d'ajout un générateur de vocaux.",
    categorie: "Admin",
    execute(message, arg) {

        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous n'êtes pas Admin.")

        if(!arg[0]) return message.channel.send("Il me faut l'id d'un vocal.");
        if(isNaN(arg[0])) return message.channel.send("L'id doit être composer de chiffres.")

        if(!message.client.channels.cache.get(arg[0])) return message.channel.send("Ce channel n'existe point.")

        let rawdata = fs.readFileSync("./json/channel.json");
        let data = JSON.parse(rawdata);

        for(let i = 0; i < data["voc_channel"].length; i++) {
            if(arg[0] == data["voc_channel"][i]) {
                return message.channel.send("Le channel est déjà enregistrer.")
            }
        }

        data.voc_channel.push(arg[0])

        let push = JSON.stringify(data, null, 2);
        fs.writeFile('./json/channel.json', push, (err) => {
            if (err) throw err;
        });

        message.channel.send("Channel bien sauvegarder.")

    }
}