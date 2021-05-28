const fs = require('fs');
const Discord = require('discord.js');
const QuickChart = require('quickchart-js');

module.exports = {
    name: "stats",
    description: "Test",
    categorie: "Other",
    execute(message, arg) {
        const chart = new QuickChart();
        // Liste de tout les mois (merci Not)
        let mouths = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre','octobre', 'novembre', 'decembre'];
        let month1 = arg[0]
        let month2 = arg[1]
        // Création des date
        let d = new Date();
        let d_year = d.getFullYear();
        let d_mouth = d.getMonth() + 1;
        // Ouvertur du JSON des stats
        let rawdata = fs.readFileSync('./json/stats.json');
        let json_stats = JSON.parse(rawdata);

        function monthNameToNum(monthname) {
            let month = mouths.indexOf(monthname.toLowerCase());
            return month ? month + 1 : 0;
        }

        // Si il n'y a pas d'argument on récup les bon stats (celle du mois et de l'anne en cour).
        if(arg.length == 0) {
            for(let i = 0; i < json_stats.length; i++) {
                if(json_stats[i].year == d_year && json_stats[i].month == d_mouth) {
                    // Si il n'y a pas de mois avant celui actuelle il met les comptes a 0
                    if(!json_stats[i - 1]) {
                        json_stats[i - 1] = {
                            year: json_stats[i].year,
                            mouth: json_stats[i].month,
                            members: {
                                join: 0,
                                leave: 0
                            }
                        }
                    }
    
                    chart.setConfig({
                        type: 'line',
                        data: { 
                            labels: [mouths[d_mouth - 1],
                            mouths[d_mouth - 2]],
                            datasets: [
                            { 
                                label: 'Arrivant',
                                data: [json_stats[i].members.join, json_stats[i - 1].members.join],
                                backgroundColor: 'rgba(117,117,117,0.6)',
                                borderColor: 'rgba(117,117,117,0.6)'
                                
                            },
                            { 
                                label: 'Départ',
                                data: [json_stats[i].members.leave, json_stats[i - 1].members.leave],
                                backgroundColor: 'rgba(214,214,214,0.9)',
                                borderColor: 'rgba(214,214,214,0.9)'
                            }
                        ]},
                    });
    
                    // Création de l'embed avec toute les informations.
                    const embed = new Discord.MessageEmbed()
                    .setColor('3C3C3A')
                    .setTitle(`📊 - ${message.guild.name} - Stats`)
                    .setDescription(`Stats du mois de ${mouths[d_mouth - 1]}.`)
                    .addFields(
                        {name: "📈 Arriver", value: json_stats[i].members.join, inline: true},
                        {name: "📉 Départ", value: json_stats[i].members.leave, inline: true},
                        {name: "Mois précedent", value: "\u200B", inline: false},
                        {name: "📈 Arriver", value: json_stats[i - 1].members.join, inline: true},
                        {name: "📉 Départ", value: json_stats[i - 1].members.leave, inline: true}
                    )
                    .setImage(chart.getUrl())
                    .setTimestamp()
    
                    message.channel.send(embed)
                }
            }

        //stat avec args
        } else if (month1 != undefined && month2 != undefined) {
            //si besoin d'explication demande moi meme moi je trouve c'est le bordel
            monthName1 = monthNameToNum(month1);
            monthName2 = monthNameToNum(month2);
            let monthList = [];
            let monthNameList = [];
            let count = 0;
            let joinStat = [];
            let leaveStat = [];

            for(let x = monthName1; x < monthName2; x++ ){ 
                monthList.push(x)
                monthNameList.push(mouths[x])
            }
            if((month1 != month2) && (mouths.includes(month1) && mouths.includes(month2))) {
                for(let i = 0; i < json_stats.length; i++) {
                    if(json_stats[i].year == d_year && monthList.includes(json_stats[i].month)) {
                        count++;
                        joinStat.push(json_stats[i].members.join)
                        leaveStat.push(json_stats[i].members.leave)
                    }
                } 
                //si le nombre total de mois pas egale au nombre de mois demander on annule
                if(count != monthList.length) {
                    message.channel.send(`Certaines statistiques sont manquante (${monthList.length-count}mois)`) 
                    return;
                }
                chart.setConfig({
                    type: 'line',
                    data: { 
                        labels: monthNameList,
                        datasets: [
                        { 
                            label: 'Arriver',
                            data: joinStat,
                            backgroundColor: 'rgba(117,117,117,0.5)',
                            borderColor: 'rgba(117,117,117,0.5)'
                            
                        },
                        { 
                            label: 'Départ',
                            data: leaveStat,
                            backgroundColor: 'rgba(214,214,214,0.9)',
                            borderColor: 'rgba(214,214,214,0.9)'
                        }
                    ]},
                });
    
    
                // Création de l'embed avec toute les informations.
                const embed = new Discord.MessageEmbed()
                .setColor('3C3C3A')
                .setTitle(`📊 - ${message.guild.name} - Stats`)
                .setDescription(`Stats du mois de ${month1} a ${month2}.`)
                // .addFields(
                //     {name: "📈 Arrivant", value: json_stats[i].members.join, inline: true},
                //     {name: "📉 Départ", value: json_stats[i].members.leave, inline: true},
                //     {name: "\u200B", value: "```Mois dernier :``` \u200B", inline: false},
                //     {name: "📈 Arrivant", value: json_stats[i - 1].members.join, inline: true},
                //     {name: "📉 Départ", value: json_stats[i - 1].members.leave, inline: true}
                // )
                .setImage(chart.getUrl())
                .setTimestamp()
    
                message.channel.send(embed)
            } else message.channel.send("La commande ne correspond pas au shema suivant **!stats {mois1} {mois2}**")
        }
    }
}