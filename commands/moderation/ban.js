const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: "ban",
    description: "Bannir un membre.",
    categorie: "Moderation",
    execute(message, args) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permition `BAN_MEMBERS`.")
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Je n'ais pas la permition `BAN_MEMBERS`.")

        if(!args[0]) return message.channel.send('Veuillez spécifier un utilisateur.');

        if(!member) return message.channel.send('Impossible de trouver cet utilisateur. Désolé pour ça :/');
        if(!member.bannable) return message.channel.send('Vous n\'avez pas les permissions');

        if(member.id === message.author.id) return message.channel.send('Je ne peux pas faire cela.');

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Aucun raison';

        const banEmbed = new Discord.MessageEmbed()
        .setTitle('Membre Bannis')
        .setColor(process.color)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .addField('User Bannis', member)
        .addField('Bannis par', message.author)
        .addField('Raison', reason)
        .setTimestamp()

        message.channel.send(banEmbed);

        const banUserEmbed = new Discord.MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setTitle('CoalStudio vous ont ban !')
        .setColor(process.color)
        .setDescription(`Salut ${member}, tu as été banni par ${message.author} de CoalStudio pour la raison : \n${reason}`)
        .setTimestamp()

        member.send(banUserEmbed);

        member.ban({reason: `${reason}`});

    }
}