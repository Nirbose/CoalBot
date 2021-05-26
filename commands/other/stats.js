const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
    name: "stats",
    description: "Test",
    categorie: "Other",
    execute(message, arg) {

        // Liste de tout les mois (merci Not)
        let mouths = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre','octobre', 'novembre', 'decembre'];

        // Création des date
        let d = new Date();
        let d_year = d.getFullYear();
        let d_mouth = d.getMonth() + 1;

        // Ouvertur du JSON des stats
        let rawdata = fs.readFileSync('./json/stats.json');
        let json_stats = JSON.parse(rawdata);

        // Si il n'y a pas d'argument on récup les bon stats (celle du mois et de l'anne en cour).
        for(let i = 0; i < json_stats.length; i++) {
            if(json_stats[i].year == d_year && json_stats[i].month == d_mouth) {

                // Création de l'embed avec toute les informations.
                const embed = new Discord.MessageEmbed()
                .setColor('3C3C3A')
                .setTitle(`📊 - ${message.guild.name} - Stats`)
                .setDescription(`Stats du mois de ${mouths[d_mouth - 1]}.`)
                .addFields(
                    {name: "📉 Arrivant", value: json_stats[i].members.join, inline: true},
                    {name: "📈 Départ", value: json_stats[i].members.leave, inline: true},
                    {name: "\u200B", value: "```Mois dernier :``` \u200B", inline: false},
                    {name: "📉 Arrivant", value: json_stats[i - 1].members.join, inline: true},
                    {name: "📈 Départ", value: json_stats[i - 1].members.leave, inline: true}
                )
                .setTimestamp()

                message.channel.send(embed)
            }
        }

    }
}