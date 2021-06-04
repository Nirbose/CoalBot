const Discord = require('discord.js');

module.exports = {
    name: "serverInfo",
    description: "Permet de voir les informations d'un serveur.",
    categorie: "Information",
    aliases: ["si", "is", "serverinfo"],
    execute(message) {
        
        let guild = message.guild;

        const embed = new Discord.MessageEmbed()
        .setColor('3C3C3A')
        .setTitle("Serveur Info")
        .setDescription(`Voici toute les informations sur **${guild.name}** !`)
        .setThumbnail(guild.iconURL())
        .addFields(
            {name: "Nombre de personne :", value: guild.memberCount, inline: true},
            {name: "Owner :", value: guild.owner, inline: true},
            {name: "Crée le :", value: guild.createdAt, inline: true}
        )
        .setTimestamp()

        message.channel.send(embed)

    }
}