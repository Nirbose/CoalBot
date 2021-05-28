const Discord = require('discord.js');
var search = require('youtube-search');
const ytdl = require('ytdl-core');
const {plays} = require('../../assets/function/music');
const {yt_key} = require('../../config.json');

module.exports = {
    name: "play",
    description: "Commande permettant de jouer une musique ou la mettre dans la playliste/file d'attente.",
    aliases: ['p'],
    categorie: "Music",
    execute(message, args) {
        if(!message.member.voice.channel) return message.channel.send('Vous devez être connectez dans un voval pout effectuer cette commande.');

        if(!args) return message.channel.send("Vous devez me donner la musique a lancer.")
        const arg = args.slice(0).join(" ");
        let find = 0;

        message.member.voice.channel.join()
        .then(connection => {

            for(let i = 0; i < yt_key.length; i++) {
                search(arg, {maxResults: 10, key: yt_key[i]}, function(err, results) {

                    if(find) {
                        return;
                    }    
    
                    if(!err) {
                        for(let i = 0; i < results.length; i++) {
                        
                            if (results[i]['link'].includes('watch')) {
                                plays(message, results[i], connection);
                                return find = 1;
                            }
                            
                        }
                    } else {
                        console.log(err.response)
                    }
    
                });
            }

        })
          
    }
}