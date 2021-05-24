const fs = require('fs');

module.exports = {
    name: "playlist",
    description: "Permet de crée sa playliste.",
    categorie: "Music",
    execute(message, arg) {
        if(arg[0]) {
            arg[0].toLowerCase();
        }

        let rawdata = fs.readFileSync("./json/playlist.json");
        let data = JSON.parse(rawdata);

        if(arg[0] === "play") {

            for(let i = 0; i < data.length; i++) {
                if(data[i].userId === message.author.id) {
                    return message.channel.send('ok');
                }
                
            }

            message.channel.send('non')

        } else if(arg[0] === "add") {

        } else if(arg[0] === "remove") {

        } else if(!arg[0]) {
            return message.channel.send("Il manque un argument : `play`, `add`, `remove`")
        } else {
            return message.channel.send("Argument incorrecte.")
        }
    }
}