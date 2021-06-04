const fs = require('fs');

module.exports = {
    verif: function(message, number) {

        // Vérification de permition
        let rawdata = fs.readFileSync("./json/moderation.json");
        let data = JSON.parse(rawdata);
        let no_find = true;

        for (let i = 0; i < data.permition.length; i++) {
            const element = data.permition[i];

            if(element.user_id === message.author.id) {
                no_find = false;
                if (element.perm_number != number) {
                    return message.channel.send("Vous n'avez pas la permition.");
                }
            }
        }
        if(no_find) {
            return message.channel.send("Vous n'avez pas la permition.");
        }
    }
}