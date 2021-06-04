const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const queue = new Map();

let serverQueue;

let self = module.exports = {

    plays: function(message, song, connection, noNext = true) {

        serverQueue = queue.get(message.guild.id);

        if(!serverQueue) {
            serverQueue = {
                songs: [],
                playing: true,
                connection: null,
            };

            queue.set(message.guild.id, serverQueue);
            serverQueue.songs.push(song);

            serverQueue.connection = connection;

            const embed = new Discord.MessageEmbed()
                .setTitle(`${song.title}`)
                .setColor('#3C3C3A')
                .setDescription(`🎶 - Je lance **${song.title}** de la chaîne de __${song.channelTitle}__ !`)
                .setImage(song.thumbnails.medium.url)
                .setFooter(message.author.username, message.author.avatarURL())
                .setTimestamp()

            message.channel.send(embed)
        }
        else {
            if(noNext) {
                serverQueue.songs.push(song);
                const embed = new Discord.MessageEmbed()
                .setColor('#3C3C3A')
                .setTitle('🔊・Ajouter à la playliste')
                .setDescription(`**${song.title}** a été ajouté à la playliste actuellement construite. 🎵`)
                .setImage(song.thumbnails.medium.url)
                .setFooter(message.author.username, message.author.avatarURL())
                .setTimestamp()

                return message.channel.send(embed);
            }
	    }

        try {

            const song_exec = connection.play(ytdl(song.link, { filter: 'audioonly' } )).on('finish', () => {
                serverQueue.songs.shift();
                self.plays(message, serverQueue.songs[0], connection, false);

                try {
                    const embed = new Discord.MessageEmbed()
                    .setTitle(`${serverQueue.songs[0].title}`)
                    .setColor('#3C3C3A')
                    .setDescription(`🎶 - Je lance **${serverQueue.songs[0].title}** de la chaîne de __${serverQueue.songs[0].channelTitle}__ !`)
                    .setImage(serverQueue.songs[0].thumbnails.medium.url)
                    .setFooter(message.author.username, message.author.avatarURL())
                    .setTimestamp()
                } catch(err) {
                    return;
                }

                message.channel.send(embed)
            });

            song_exec.setVolume(0.5);
        } catch(err) {
            return;
        }
    },

    skip: function(message) {
        if(!serverQueue) {
            return message.channel.send('Aucune musique en cour.')
        }

        serverQueue.connection.dispatcher.end();
        message.channel.send("Musique skiper.")
    },

    stop: function(message) {
        if(!serverQueue) {
            return message.channel.send('Aucune musique en cour.')
        }

        serverQueue.songs = [];
	    serverQueue.connection.dispatcher.end();
    },

    resume: function(message) {
        if(!serverQueue) {
            return message.channel.send('Aucune musique en cour.')
        }

        if (!serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('Je reprend !');
		} else {
            return message.channel.send("▶ - La musique est déjà lancer.");
        }
    },

    pause: function(message) {
        if(!serverQueue) {
            return message.channel.send('Aucune musique en cour.')
        }

        if (serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('⏸ - Le musique est en pause.');
		}
    }
}