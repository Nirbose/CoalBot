const Discord = require("discord.js");

module.exports = {
	name: 'avatar',
    description:"Affiche votre avatar",
    categorie: "Other",
	execute(message, args) {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) {
            let embed = new Discord.MessageEmbed()
            .setColor('#3C3C3A')
            .setDescription('Votre avatar :')
            .setImage(message.author.avatarURL())
            return message.channel.send(embed);
		} else {
            let embed = new Discord.MessageEmbed()
            .setColor('#3C3C3A')
            .setDescription(`L'avatar de ${member} :`)
            .setImage(member.user.avatarURL())
            return message.channel.send(embed);
        }
	},
};