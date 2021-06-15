const Discord = require('discord.js');
const {Time} = require('time-value');

let bar = "———————————————————————————————";
let numberStocker;

module.exports = {
    name: "progress",
    description: "Pour voir la progression d'un musique.",
    categorie: "Music",
    execute(message) {

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
          
          
            return m + ':' + s;
        }

        function convertTime(h = 0, m, s) {
            return (h*60*60+m*60+s)*1000;
        }

        function calcul(timeMin, timeMax) {
            // console.log('timeMax : '+timeMax)
            let percent = Math.round((timeMin / timeMax) * 10000);
            // console.log('percent : ' + percent)
            let percentBar = Math.round(percent/100*bar.length);
            // console.log('percentBar : ' + percentBar);
            return percentBar;
        }

        if(!message.member.voice.channel) return message.channel.send('Vous devez être connectez dans un voval pout effectuer cette commande.');

        serverQueue = message.client.serverQueue;

        if(!serverQueue) {
            return message.channel.send('Aucune musique en cour.')
        }
        
        let time = parseTime(serverQueue.connection.dispatcher.streamTime);
        // console.log('streamTime : '+serverQueue.connection.dispatcher.streamTime)
        // console.log('streamTimeTotal : '+serverQueue.connection.dispatcher.totalStreamTime)
        let t = serverQueue.songs[0].duration.split(':');
        let numberBar = calcul(serverQueue.connection.dispatcher.totalStreamTime, convertTime(0, t[0], t[1]));
        bar = bar.split('')

        
        bar[numberStocker] = "—" 
        numberStocker = numberBar


        bar[numberBar] = "O";
        bar = bar.toString().replace(/,/g, '');

        const embed = new Discord.MessageEmbed()
        .setTitle(serverQueue.songs[0].title)
        .setDescription(`Votre musique :\n${time} [  ${bar}  ] ${serverQueue.songs[0].duration}`)
        .setTimestamp()

        message.channel.send(embed);

    }
}