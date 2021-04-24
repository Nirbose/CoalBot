const Discord = require('discord.js');

module.exports = {
	name: 'sondage',
	description: 'Commande pour lancée une suggestion.',
	aliases: ['survey', 'sond'],
	execute(message, arg) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous n'êtes pas Admin.")

        const msg = arg.join(' ');

        let embed = new Discord.MessageEmbed()
        .setColor('3C3C3A')
        .setAuthor(message.author.name, message.author.displayAvatarURL({ dynamic: true }))
        .addField("**Sondage :**", `\`\`\` ${msg} \`\`\` `)
        .setFooter(message.guild.name, message.guild.iconURL())

        message.channel.send(embed).then((m) => {
            m.react('✅')
            m.react('❌')
        })
	},
};