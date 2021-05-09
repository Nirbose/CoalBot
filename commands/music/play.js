const Discord = require('discord.js');
var search = require('youtube-search');
const ytdl = require('ytdl-core');
const {plays} = require('../../assets/function/music');

module.exports = {
    name: "play",
    description: "permet de lancer une musique.",
    aliases: ['p'],
    execute(message, args) {
        if(!message.member.voice.channel) return message.channel.send('Vous devez être connectez dans un voval pout effectuer cette commande.');

        if(!args) return message.channel.send("Vous devez me donner la musique a lancer.")
        const arg = args.slice(0).join(" ");

        message.member.voice.channel.join()
        .then(connection => {

            search(arg, {maxResults: 10, key: 'AIzaSyDhrmbamgGKOqMeFvzW_fdJ5yvoJTSL1nM'}, function(err, results) {
                if(err) return console.log(err);

                for(let i = 0; i < results.length; i++) {
                    
                    if (results[i]['link'].includes('watch')) {
                        plays(message, results[i], connection);
                        return;
                    }
                    
                }

            });

        })
          
    }
}