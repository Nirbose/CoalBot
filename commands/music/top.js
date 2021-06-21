const Discord = require('discord.js');
const ytsr = require('ytsr');

module.exports = {
    name: "top",
    description: "Permet de voir l'ordre des musique",
    categorie: "Music",
    async execute(message) {

        function parseTime(milliseconds){
            //Get hours from milliseconds
            var hours = milliseconds / (1000*60*60);
            var absoluteHours = Math.floor(hours);
            var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;
          
            //Get remainder from hours and convert to minutes
            var minutes = (hours - absoluteHours) * 60;
            var absoluteMinutes = Math.floor(minutes);
            var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;
          
            //Get remainder from minutes and convert to seconds
            var seconds = (minutes - absoluteMinutes) * 60;
            var absoluteSeconds = Math.floor(seconds);
            var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;
          
          
            return h + ':' + m + ':' + s;
        }

        if(!message.member.voice.channel) return message.channel.send('Vous devez être connectez dans un voval pout effectuer cette commande.');

        serverQueue = message.client.serverQueue;

        if(!serverQueue) {
            return message.channel.send('Aucune musique en cour.')
        }

        // duration traitement //

        let times = serverQueue.songs[0].duration.split(':');
        if(times.length == 2) {
            times = '00:'+time.toString().replace(/,/g, ':');
            console.log(times);
        } else if(times.length == 1) {
            times = '00:00:'+times.toString().replace(/,/g, ':');
        } else {
            times = times.toString().replace(/,/g, ':');
        }

        // Fin duration traitement //
        
        const embed = new Discord.MessageEmbed()
        .setTitle('Liste des Musiques enregistré :')
        .setColor('#3C3C3A')
        .setTimestamp()

        for (let i = 0; i < serverQueue.songs.length; i++) {
            const element = serverQueue.songs[i];
            embed.addField(element.title, element.duration);
            
        }
        // console.log(time);
        // console.log(isNaN(time))
        // console.log(parseInt(time))

        // embed.setDescription(`Vous en avez pour ${time}`)

        message.channel.send(embed);

    }
}

