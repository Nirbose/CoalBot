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
        }
        else {
            if(noNext) {
                serverQueue.songs.push(song);
			    return message.channel.send(`${song.title} est ajouter a la "play-list" .`);
            }
	    }

        try {

            const song_exec = connection.play(ytdl(song.link, { filter: 'audioonly' } )).on('finish', () => {
                serverQueue.songs.shift();
                message.channel.send('Good !')
                self.plays(message, serverQueue.songs[0], connection, false);
            });

            song_exec.setVolume(0.5);
        } catch(err) {
            return;
        }
    },

    skip: function(message) {
        if(!serverQueue) {
            return message.channel.send('Aucunne musique en cour.')
        }

        serverQueue.connection.dispatcher.end();
    },

    stop: function(message) {
        if(!serverQueue) {
            return message.channel.send('Aucunne musique en cour.')
        }

        serverQueue.songs = [];
	    serverQueue.connection.dispatcher.end();
    },

    resume: function(message) {
        if(!serverQueue) {
            return message.channel.send('Aucunne musique en cour.')
        }

        if (!serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('Je reprend !');
		} else {
            return message.channel.send("La musique est déjà lancer.");
        }
    },

    pause: function(message) {
        if(!serverQueue) {
            return message.channel.send('Aucunne musique en cour.')
        }

        if (serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('Le musique est en pause.');
		}
    }
}