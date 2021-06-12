const fs = require('fs');
const Discord = require('discord.js');
const QuickChart = require('quickchart-js');

module.exports = {
    name: "stats",
    description: "Test",
    categorie: "Information",
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
        const sqlite3 = require('sqlite3');
        let db = new sqlite3.Database("./db/database.db")
        
        function monthNameToNum(monthname) {
            let month = mouths.indexOf(monthname.toLowerCase());
            return month ? month + 1 : 0;
        }

        // Si il n'y a pas d'argument on récup les bon stats (celle du mois et de l'anne en cour).
        if(arg.length == 0) {
            let last;
            console.log('enter')
            let joinLast;
            let leaveLast;
            db.all(`SELECT * FROM stats`, (err, rows) => {
                rows.forEach(element => {
                    if(element.month == d_mouth - 1 && element.year == d_year) {
                        last = element.id;
                        joinLast = element.joine
                        leaveLast = element.leave
                    }
                    if(element.month == d_mouth && element.year == d_year) {
                        if(last == undefined) {
                            chart.setConfig({
                                type: 'line',
                                data: { 
                                    labels: [mouths[d_mouth - 1]],
                                    datasets: [
                                    {
                                        label: 'Arrivant',
                                        data: [element.joine],
                                        backgroundColor: 'rgba(117,117,117,0.6)',
                                        borderColor: 'rgba(117,117,117,0.6)'
                                    },
                                    { 
                                        label: 'Départ',
                                        data: [element.leave],
                                        backgroundColor: 'rgba(214,214,214,0.9)',
                                        borderColor: 'rgba(214,214,214,0.9)'
                                    }
                                ]},
                            });
                            const embed = new Discord.MessageEmbed()
                            .setColor('3C3C3A')
                            .setTitle(`📊 - ${message.guild.name} - Stats`)
                            .setDescription(`Stats du mois de ${mouths[d_mouth - 1]}.`)
                            .addFields(
                                {name: "📈 Arriver", value: element.joine, inline: true},
                                {name: "📉 Départ", value: element.leave, inline: true},
                            )
                            .setImage(chart.getUrl())
                            .setTimestamp()
                            message.channel.send(embed)
                        } else {
                            chart.setConfig({
                                type: 'line',
                                data: { 
                                    labels: [mouths[d_mouth - 1],mouths[d_mouth - 2]],
                                    datasets: [
                                    { 
                                        label: 'Arrivant',
                                        data: [element.joine, joinLast],
                                        backgroundColor: 'rgba(117,117,117,0.6)',
                                        borderColor: 'rgba(117,117,117,0.6)'
                                        
                                    },
                                    { 
                                        label: 'Départ',
                                        data: [element.leave, leaveLast],
                                        backgroundColor: 'rgba(214,214,214,0.9)',
                                        borderColor: 'rgba(214,214,214,0.9)'
                                    }
                                ]},
                            });
                            const embed = new Discord.MessageEmbed()
                            .setColor('3C3C3A')
                            .setTitle(`📊 - ${message.guild.name} - Stats`)
                            .setDescription(`Stats du mois de ${mouths[d_mouth - 2]} a ${mouths[d_mouth - 1]}.`)
                            .addFields(
                                {name: "📈 Arriver", value: element.joine, inline: true},
                                {name: "📉 Départ", value: element.leave, inline: true},
                                {name: "Mois précedent", value: "\u200B", inline: false},
                                {name: "📈 Arriver", value: joinLast, inline: true},
                                {name: "📉 Départ", value: leaveLast, inline: true}
                            )
                            .setImage(chart.getUrl())
                            .setTimestamp()
                            message.channel.send(embed)
                        }
                    }
                })
            });
        } else if (arg[0] != undefined && arg[1] != undefined) {
            monthName1 = monthNameToNum(month1);
            monthName2 = monthNameToNum(month2);
            let total = 0;
            let field = [];
            let monthList = [];
            let joinStat = [];
            let leaveStat = [];
            console.log(mouths.includes(month1))
            if(!mouths.includes(month1) || !mouths.includes(month2)) return message.channel.send("Hmm, il y'a un probleme avec le nom d'un des mois")
            db.all(`SELECT * FROM stats WHERE month > ${monthName1} AND month <= ${monthName2}`, (err, rows) => {
                rows.forEach(element => {
                    total++ 
                    monthList.push(mouths[element.month-1])
                    joinStat.push(element.joine)
                    leaveStat.push(element.leave)
                    field.push({name: `Pour le mois de ${mouths[element.month-1]}`, value: `📈 ${element.joine} Arrivant, 📉 ${element.leave} Départ`})
                })
                if(total != monthName2-monthName1) return message.channel.send(`Data manquante`)

                chart.setConfig({
                    type: 'line',
                    data: { 
                        labels: monthList.reverse(),
                        datasets: [
                        { 
                            label: 'Arrivant',
                            data: joinStat,
                            backgroundColor: 'rgba(117,117,117,0.6)',
                            borderColor: 'rgba(117,117,117,0.6)'
                            
                        },
                        { 
                            label: 'Départ',
                            data: leaveStat,
                            backgroundColor: 'rgba(214,214,214,0.9)',
                            borderColor: 'rgba(214,214,214,0.9)'
                        }
                    ]},
                });

                const embed = new Discord.MessageEmbed()
                .setColor('3C3C3A')
                .setTitle(`📊 - ${message.guild.name} - Stats`)
                .setDescription(`Stats du mois de ${month1} a ${month2}.`)
                .addFields(field.reverse())
                .setImage(chart.getUrl())
                .setTimestamp()
                message.channel.send(embed)
            })
        } else {
            message.channel.send('Commande invalide, le format doit etre `!stats {mois} {mois}` ou `!stats`')
        }
        //stat avec args
    }
}