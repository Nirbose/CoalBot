module.exports = {
    name: "lock",
    description: "Commande pour bloquer un salon textuel.",
    categorie: "Moderation",
    execute(message) {

        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Vous n'avez pas la permition `MANAGE_CHANNELS`.");
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Je n'ais pas la permition `MANAGE_CHANNELS`.");

        const role = guild.roles.find("name", "Coal");

        message.channel.overwritePermissions(role,{ 'SEND_MESSAGES': false })
    }
}