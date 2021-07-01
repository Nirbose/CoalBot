const Discord = require("discord.js");

module.exports = {
    name: "userinfo",
    description: "Permet de voir les informations sur un membre.",
    categorie: "Information",
    aliases: ["ui", "iu", "userInfo"],

    execute(message, arg) {

        const embed = new Discord.MessageEmbed();
        let roles = [];

        if(!arg[0]) {

            let info = message.guild.member(message.author)

            info.roles.cache.forEach(element => {
                if(element.name != "@everyone") {
                    roles.push("<@&"+element.id+">");
                }
                
            });

            let flags = info.user.flags.toArray();
            let userFlags = [];

            for(let i = 0; i < flags.length; i++) {
                let emojiID = message.client.emojis.cache.find(e => e.name == flags[i]);
                userFlags.push(`${emojiID}`)
            }

            let time = parseInt(info.user.createdTimestamp)
            let d = new Date(time);
            let date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();

            // Création de l'embed.
            embed.setTitle("Information sur " + info.user.username)
            .setColor(process.color)
            .setThumbnail(info.user.avatarURL())
            .addFields(
                {name: "Pseudo :", value: `\`\`\` ${info.user.username} \`\`\``, inline: true},
                {name: "Id :", value: `\`\`\`${info.user.id}\`\`\``, inline: true},
                {name: "Statue :", value: `\`\`\`${info.user.presence.status}\`\`\``, inline: true},
                {name: "Création compte :", value: `\`\`\`${date.toLocaleString()}\`\`\``},
                {name: "Badges :", value: `${userFlags.toString().replace(/,/g, '')}`, inline: true},
                {name: "Roles :", value: roles.toString()}
            )

            
        } else {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if(!member) return message.channel.send("Je ne trouve pas l'utilisateur.");
        }

        message.channel.send(embed)

    }
}