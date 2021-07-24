module.exports = {
    name: "banlist",
    description: "Envoie la liste des ban en MP.",
    categorie: "Moderation",

    execute(message) {

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permition `BAN_MEMBERS`.");
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Je n'ais pas la permition `BAN_MEMBERS`.");

        message.guild.fetchBans().then(bans => {
            message.react('👍');
            if(bans.size == 0) return message.author.send("Aucun membre ban.");

            console.log(bans);
        })

    }
}