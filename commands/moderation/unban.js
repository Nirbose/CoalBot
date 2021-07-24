const Discord = require('discord.js');

module.exports = {
    name: "unban",
    description: "Permet de déban une personne par sont ID.",
    categorie: "Moderation",
    execute(message, args) {

        function errEmbed(description) {
            const embed = new Discord.MessageEmbed()
                .setTitle('Erreur')
                .setDescription(description)
                .setColor(process.errorColor)
            
            return embed;
        }

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permition `BAN_MEMBERS`.");
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Je n'ais pas la permition `BAN_MEMBERS`.");

        let reason = args.splice(1).join(" ");
        let userID = args[0];

        if(!reason) reason = "Aucun raison";
        if(!args[0]) return message.channel.send("Il me faut l'ID de l'utilisateur à unban.");
        if(isNaN(args[0])) return message.channel.send("L'ID doit être constitué que de chiffre.");

        message.guild.fetchBans().then(async bans => {

            if(bans.size == 0) return message.channel.send("Il n'y a pas d'utilisateur ban.");
            
            let userBan = bans.find(ban => ban.user.id == userID);

            if(!userBan) return message.channel.send("Je n'ais pas trouver l'utilisateur dans la liste des bans.");

            await message.guild.members.unban(userBan.user, reason).catch(err => {

                const embed = errEmbed("Une erreur est survenue lors de l'unban.");

                return message.channel.send(embed);

            }).then( () => {

                const embed = new Discord.MessageEmbed()
                .setTitle('UnBan')
                .setDescription(`L'utilisateur <@${userID}> a bien été unban.`)
                .setColor(process.successColor)
                .setTimestamp()
                .setThumbnail(userBan.user.avatarURL())

                message.channel.send(embed);
            })
        
        })

    }
}