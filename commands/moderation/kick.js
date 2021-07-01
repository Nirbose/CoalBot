const Discord = require('discord.js');

module.exports = {
    name: "kick",
    description:"permet d'expulser un membre",
    categorie: "Moderation",
    execute(message, args) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Je ne peux pas faire cela.");
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("Je n'ais pas les droits pour faire cela.");

        if(!args[0]) return message.channel.send("Spécifier un utilisateur s'il vous plaît.");

        if(!member) return message.channel.send("Je ne trouve pas l'utilisateur.");
        if(!member.kickable) return message.channel.send("Cet utilisateur ne peut pas être kick.");

        if(member.id === message.author.id) return message.channel.send("Vous ne pouvez pas vous auto kick.");

        let reason = args.slice(1).join(" ");

        if(!reason) { reason = 'Pas de raison';}

        member.kick(`${reason}`)
        .catch(err => {
            if(err) return message.channel.send('Un problème est survenu')
        })

        const embed = new Discord.MessageEmbed()
        .setColor(process.color)
        .setTitle('Membre Kick')
        .addFields(
            {name: 'User Kick', value: `${member}`},
            {name: 'Kick par', value: `${message.author}`},
            {name: 'Raison', value: `${reason}`},
        )
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setFooter('Kick')
        .setTimestamp()

        message.channel.send(embed);
    }
}