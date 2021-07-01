const Discord = require('discord.js');

module.exports = {
    name: "serverInfo",
    description: "Permet de voir les informations d'un serveur.",
    categorie: "Information",
    aliases: ["si", "is", "serverinfo"],
    execute(message) {
        
        let guild = message.guild;
        let roles = "";

        guild.roles.cache.forEach(element => {
            if(element.name == "@everyone") return;
            roles += `${element}  `;
        });

        const embed = new Discord.MessageEmbed()
        .setColor(process.color)
        .setTitle("Serveur Info")
        .setDescription(`Voici toute les informations sur **${guild.name}** !`)
        .setThumbnail(guild.iconURL())
        .addFields(
            {name: "Nombre de personne :", value: `\`\`\`${guild.memberCount}\`\`\``, inline: true},
            {name: "Owner :", value: `\`\`\` ${guild.owner.displayName} \`\`\``, inline: true},
            {name: "Nombre de Salon :", value: `\`\`\` ${guild.channels.cache.size} \`\`\``, inline: true},
            
            {name: "Crée le :", value: `\`\`\` ${guild.createdAt} \`\`\``},

            {name: "Description :", value:`\`\`\` ${guild.description} \`\`\``, inline: true},
            {name: "Région :", value: `\`\`\` ${guild.region} \`\`\``, inline: true},
            {name: "Nombre de Rôles :", value: `\`\`\` ${guild.roles.cache.size} \`\`\``, inline: true},

            {name: "Rôles :", value: roles}
        )
        .setTimestamp()

        message.channel.send(embed)

    }
}