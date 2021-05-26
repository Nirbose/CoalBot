const Discord = require("discord.js");

module.exports = {
    name: "userinfo",
    description: "Permet de voir les informations sur un membre.",
    categorie: "Information",
    aliases: ["ui", "iu", "userInfo"],

    execute(message, arg) {

        const embed = new Discord.MessageEmbed();
        let roles = "";

        if(!arg[0]) {

            let info = message.guild.member(message.author)

            info.roles.cache.forEach(element => {
                if(element.name != "@everyone") {
                    roles += element.name + " "
                }
                
            });

            embed.setTitle("Information sur " + info.user.username)
            .setColor('3C3C3A')
            .setThumbnail(info.user.avatarURL())
            .addFields(
                {name: "Pseudo :", value: info.user.username, inline: true},
                {name: "Id :", value: info.user.id, inline: true},
                {name: "Roles :", value: roles}
            )

            
        } else {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if(!member) return message.channel.send("Je ne trouve pas l'utilisateur.");
        }

        message.channel.send(embed)

    }
}