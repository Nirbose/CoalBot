const Discord = require('discord.js');

module.exports = {
    name: 'memberadd',
    isOwner: true,
    execute(message) {
        let date = new Date(message.author.createdTimestamp)

        const embed = new Discord.MessageEmbed()
        .setColor(process.color)
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setTitle(message.author.username + ' | New Member')
        .setThumbnail(message.author.avatarURL())
        .setDescription(`**${message.author.username}** vient d'arriver sur le serveur, voilà toutes les informations le concernant. `)
        .addFields(
            {name: 'Pseudo :', value: message.author, inline: true},
            {name: 'Creation compte :', value: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`, inline: true},
            {name: 'ID :', value: message.author.id, inline: true}
        )
        .setTimestamp()

        message.channel.send(embed);
    }
}