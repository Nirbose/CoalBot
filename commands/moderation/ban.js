const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: "ban",
    description: "Bannir un membre.",

    execute(message, args) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!message.member.hasPermission("BAN_MEMBERS")) {return message.channel.send("Vous n'avez pas la permission pour cette commande.")}
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) {return message.channel.send("Je n'ais pas les permissions pour exécuter cette commande.")}

        if(!args[0]) return message.channel.send('Veuillez spécifier un utilisateur.');

        if(!member) return message.channel.send('Impossible de trouver cet utilisateur. Désolé pour ça :/');
        if(!member.bannable) return message.channel.send('Vous n\'avez pas les permissions');

        if(member.id === message.author.id) return message.channel.send('Je ne peux pas faire cela.');

        let reason = args.slice(1).join(" ");

        if(!reason) {reason = 'Pas de raison';}

        member.ban(`${reason}`)
        .catch(err => {
            if(err) return message.channel.send('Un problème est survenu.')
        })

        const banembed = new Discord.MessageEmbed()
        .setTitle('Membre Bannis')
        .setColor('#3C3C3A')
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .addField('User Bannis', member)
        .addField('Bannis par', message.author)
        .addField('Raison', reason)
        .setFooter(`${member} a été bannis`)
        .setTimestamp()

        message.channel.send(banembed);


    }
}