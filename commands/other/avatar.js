const Discord = require("discord.js");

module.exports = {
	name: 'avatar',
	execute(message, args) {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) {
            let embed = new Discord.MessageEmbed()
            .setColor('#3C3C3A')
            .setDescription('Ton avatar :')
            .setImage(message.author.displayAvatarURL({ dynamic: true }))
            return message.channel.send(embed);
		} else {
            let embed = new Discord.MessageEmbed()
            .setColor('#3C3C3A')
            .setDescription(`L'avatar de ${member}`)
            .setImage(message.mentions.users.avatarURL)
            return message.channel.send(embed);
        }
	},
};