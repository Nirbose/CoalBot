const tools = require('../../assets/function/modo_perm');

module.exports = {
    name: "lock",
    description: "Commande pour bloquer un salon textuel.",
    categorie: "Moderation",
    execute(message) {

        // Vérification de permition
        tools.verif(message, 1);

        const role = guild.roles.find("name", "Coal");

        message.channel.overwritePermissions(role,{ 'SEND_MESSAGES': false })
    }
}