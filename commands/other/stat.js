const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	name: 'stat',
	description: 'Renvoie le nombre de personne qui ont rejoins par rapport au mois dernier !',
	categorie: "Other",
	execute(message, arg) {
        let months = ['janvier', 'fevrier', 'mars', 'avril', 'mai','juin', 'juillet', 'aout', 'septembre','octobre', 'novembre', 'decembre'];
        timestamp = [];
        user = message.guild.members.cache;
        let arg1 = arg[0];
        let userJoin = 0;
        let userDif = 0;

        user.forEach(element => {
            if(element['user'].bot == true) return;
            joining = message.guild.member(element['user'].id).joinedAt;
            timestamp.push(joining.toLocaleString('fr-FR'));
        });

        function monthNameToNum(monthname) {
            let month = months.indexOf(monthname.toLowerCase());
            return month ? month + 1 : 0;
        }
        //join du mois
        for(i in timestamp) {
            time = timestamp[i].split(' ')[0].split('/');
            if(monthNameToNum(arg1) == parseInt(time[1], 10)) userJoin += 1;
        }
        //join du mois dernier 
        for(i in timestamp) {
            time = timestamp[i].split(' ')[0].split('/');
            lastmonth = time[1]-1;
            if(lastmonth >=0 && time[1] == lastmonth) userDif +=1;
        }

        const embed = new Discord.MessageEmbed()
        .setColor('3C3C3A')
        .setTitle(`Statistique a propos de CoalStudio`)
        .addField(`Durant le mois de ${arg1}`, `${userJoin} Utilisateurs ont rejoins le discord` )
        .addField(`Difference`, `Sois ${userDif} personne de ${userDif>=0 ? "plus" : "moins"} que le mois dernier` )
        .setTimestamp()
        
        months.includes(arg1.toLowerCase()) ? message.channel.send(embed) : message.channel.send("Le mois que vous avez entrée n'est pas valide");
	},
};