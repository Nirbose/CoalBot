const fs = require('fs');
let search = require('youtube-search');
const ytdl = require('ytdl-core');
const {yt_key} = require('../../config.json');
const Discord = require('discord.js');

let self = module.exports = {
    name: "playlist",
    description: "Permet de crée sa playliste.",
    categorie: "Music",
    execute(message, arg) {
        if(arg[0]) {
            arg[0].toLowerCase();
        }

        let rawdata = fs.readFileSync("./json/playlist.json");
        let data = JSON.parse(rawdata);
        let find = 0;

        if(arg[0] === "play") {

            if(!message.member.voice.channel) return message.channel.send("Vous devez être dans un vocal.");

            for(let i = 0; i < data.length; i++) {
                if(data[i].userId === message.author.id) {

                    message.member.voice.channel.join().then(connection => {
                        self.plays(message, data[i].playlist, data[i].playlist[0], connection)
                    })
                    message.channel.send('Je lance votre première musique.')
                    return;
                }
                
            }

            message.channel.send('Vous n\'avez pas de playlist !')

        } else if(arg[0] === "add") {

            // Partie Add 

            if(!arg[1]) return message.channel.send("Il me manque la musique a ajouter a la playlist...")

            const argSearch = arg.slice(1).join(" ");

            for (let i = 0; i < yt_key.length; i++) {
                if(find) {
                    break;
                }

                search(argSearch, {maxResults: 5, key: yt_key[i]}, function(err, results) {
                    if(find) {
                        return;
                    }
    
                    if(!err) {
                        for(let i = 0; i < results.length; i++) {
                        
                            if (results[i]['link'].includes('watch')) {
                                find = 1;
    
                                for(let i = 0; i < data.length; i++) {
                                    if(data[i].userId === message.author.id) {
                                        data[i].playlist.push(
                                            {id: data[i].playlist.length + 1, title: results[i].title, url: results[i].link}
                                        );

                                        let push = JSON.stringify(data, null, 2);
                                        fs.writeFile('./json/playlist.json', push, (err) => {
                                            if (err) throw err;
                                        });
                                        
                                        return message.channel.send("Votre musique a bien été ajouter a votre playlist !");
                                    }
                                    
                                }
                    
                                data.push(
                                    {userName: message.author.username, userId: message.author.id, playlist: [{id: 1, title: results[i].title, url: results[i].link}]}
                                );
                                let push = JSON.stringify(data, null, 2);
                                fs.writeFile('./json/playlist.json', push, (err) => {
                                    if (err) throw err;
                                });
                                message.channel.send('Votre playlist à été crée et j\'ai ajouté votre musique !')
                            }
                            
                        }
                    } else {
                        console.log(err)
                    }
                });
                
            }

        } else if(arg[0] === "remove") {

        } else if(arg[0] === "listing") {

            const embed = new Discord.MessageEmbed()
            .setTitle("Voilà votre playlist :")
            .setColor('#3C3C3A')
            .setTimestamp()

            for(let i = 0; i < data.length; i++) {
                if(data[i].userId === message.author.id) {
                    for(let index = 0; index < data[i].playlist.length; index++) {

                        embed.addField(data[i].playlist[index].id + " - " + data[i].playlist[index].title, data[i].playlist[index].url)
                        
                    }

                    message.channel.send(embed)
                }
            }

        } else if(!arg[0]) {
            return message.channel.send("Il manque un argument : `play`, `add`, `remove`")
        } else {
            return message.channel.send("Argument incorrecte.")
        }
    },

    plays(message, list, song, connection) {
        // Lancement de la musique
        const song_exec = connection.play(ytdl(song.url, { filter: 'audioonly' } )).on('finish', () => {
            list.shift();
            self.plays(message, list, list[0]);

            try {
                const embed = new Discord.MessageEmbed()
                .setTitle(`${list[0].title}`)
                .setColor('#3C3C3A')
                .setDescription(`🎶 - Je lance **${list[0].title}** !`)
                .setFooter(message.author.username, message.author.avatarURL())
                .setTimestamp()
            } catch(err) {
                return;
            }

            message.channel.send(embed);
            song_exec.setVolume(0.5);
        });
    }
}