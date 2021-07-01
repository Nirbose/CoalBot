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
        let type = arg[0]
        let month1 = arg[1]
        let month2 = arg[2]
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
        if(arg.length == 1 && type == 'membres') {
            let last;
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
                            .setColor(process.color)
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
                            .setColor(process.color)
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
        } else if (arg[1] != undefined && arg[2] != undefined && type == 'membres') {
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
                .setColor(process.color)
                .setTitle(`📊 - ${message.guild.name} - Stats`)
                .setDescription(`Stats du mois de ${month1} a ${month2}.`)
                .addFields(field.reverse())
                .setImage(chart.getUrl())
                .setTimestamp()
                message.channel.send(embed)
            })
        } else if(arg.length == 1 && type == 'messages') {
            db.all(`SELECT * FROM messages`, (err, rows) => {
                let msg = 0;
                let last;
                let msgLast;
                let statChanlast = []
                let statChan = []
                rows.forEach(element => {
                    let time = parseInt(element.timestamp)
                    const d = new Date( time );
                    channels = element.channel;
                    names = message.client.channels.cache.get(channels).name;
                    month = d.getMonth()+1;
                    year = d.getFullYear()
                    if(month == d_mouth - 1 && year == d_year) {
                        last = element.id;
                        msgLast += 1
                        if (statChanlast.find(u => u.channels === names) == undefined) statChanlast.push({'channels':names, 'total':0})
                        statChanlast.forEach(key => {
                            if(key.channels == names) {
                                key.total += 1;
                            }
                        })
                    }
                    if(month == d_mouth && year == d_year) {
                        msg += 1
                        if (statChan.find(u => u.channels === names) == undefined) statChan.push({'channels':names, 'total':0})
                        statChan.forEach(key => {
                            if(key.channels == names) {
                                key.total += 1;
                            }
                        })
                    }
                })
                let fields = [];
                for(i in statChan) {
                    fields.push({name: `Nombre de message dans '${statChan[i].channels}'`, value: statChan[i].total})
                }
                let fieldsLast = [];
                for(i in statChanlast) {
                    fields.push({name: `Nombre de message dans '${statChanlast[i].channels}'`, value: statChanlast[i].total})
                }
                if(last == undefined) {
                    chart.setConfig({
                        type: 'line',
                        data: { 
                            labels: [mouths[d_mouth - 1]],
                            datasets: [
                            {
                                label: 'Message envoyer',
                                data: [msg],
                                backgroundColor: 'rgba(117,117,117,0.6)',
                                borderColor: 'rgba(117,117,117,0.6)'
                            }
                        ]},
                    });
                    const embed = new Discord.MessageEmbed()
                    .setColor(process.color)
                    .setTitle(`📊 - ${message.guild.name} - Stats`)
                    .setDescription(`Stats du mois de ${mouths[d_mouth - 1]}.`)
                    .addFields(
                        {name: "📈 Message envoyer", value: msg, inline: true},
                        fields
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
                                label: 'Message Envoyer',
                                data: [msg, msgLast],
                                backgroundColor: 'rgba(117,117,117,0.6)',
                                borderColor: 'rgba(117,117,117,0.6)'
                                
                            }
                        ]},
                    });
                    const embed = new Discord.MessageEmbed()
                    .setColor(process.color)
                    .setTitle(`📊 - ${message.guild.name} - Stats`)
                    .setDescription(`Stats du mois de ${mouths[d_mouth - 2]} a ${mouths[d_mouth - 1]}.`)
                    .addFields(
                        {name: "📈 Message envoyer", value: msg, inline: true},
                        fields,
                        {name: "Mois précedent", value: "\u200B", inline: false},
                        {name: "📈 Message envoyer", value: msgLast, inline: true},
                        fieldsLast
                    )
                    .setImage(chart.getUrl())
                    .setTimestamp()
                    message.channel.send(embed)
                   

                }
            })
        } else if(arg[1] != undefined && arg[2] != undefined && type == 'messages') {
            //faire stats mois
        } else {
            message.channel.send('Commande invalide, le format doit etre `!stats {membres/messages} {mois} {mois}` ou `!stats {membres/messages}`')
        }
    }
}