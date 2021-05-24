const fs = require('fs');

module.exports = {
    name: "unlock",
    description: "Commande pour débloquer un salon textuel.",
    categorie: "Moderation",
    execute(message) {

        // Vérification de permition
        tools.verif(message, 1);
        
        const role = guild.roles.find("name", "Coal");

        message.channel.overwritePermissions(role,{ 'SEND_MESSAGES': true })
    }
}