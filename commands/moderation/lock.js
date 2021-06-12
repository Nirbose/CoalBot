module.exports = {
    name: "lock",
    description: "Commande pour bloquer un salon textuel.",
    categorie: "Moderation",
    execute(message) {

        const role = guild.roles.find("name", "Coal");

        message.channel.overwritePermissions(role,{ 'SEND_MESSAGES': false })
    }
}