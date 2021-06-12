const Discord = require('discord.js');
let search = require('youtube-search');
const ytdl = require('ytdl-core');
const {yt_key} = require('../../config.json');

// Variable
let serverQueue;

module.exports = {
    name: "play",
    description: "Commande permettant de jouer une musique ou la mettre dans la playliste/file d'attente.",
    aliases: ['p'],
    categorie: "Music",

    execute(message, args) {
        console.log(message.client.music);
        const queue = message.client.music;

        // Fonction play pour exuter la musique
        function play(guild, song) {
            // On lance la musique
            serverQueue = queue.get(guild.id);

            if (!song) { // Si la musique que l'utilisateur veux lancer n'existe pas on annule tout et on supprime la queue de lecture
                serverQueue.voiceChannel.leave();
                queue.delete(guild.id);
                return;
            
            }

            // On lance la musique
            const dispatcher = serverQueue.connection
            .play(ytdl(song.url, { filter: 'audioonly' }))
            .on("finish", () => { // On écoute l'événement de fin de musique
                    serverQueue.songs.shift(); // On passe à la musique suivante quand la courante se termine
                    play(guild, serverQueue.songs[0]);
            })
            .on("error", error => console.error(error));
            message.channel.send('je lance.');
        }


        // Verification
        if(!message.member.voice.channel) return message.channel.send('Vous devez être connectez dans un voval pout effectuer cette commande.');
        if(!args[0]) return message.channel.send("Vous devez me donner la musique a lancer.")

        const arg = args.slice(0).join(" ");

        // Connexion au salon vocal
        message.member.voice.channel.join()
        .then(connection => {

            // Cherche sur youtube
            search(arg, {maxResults: 10, key: yt_key}, function(err, results) {
                console.log(results[0])

                if(!serverQueue) {
                    const queueConstruct = {
                        textChannel : message.channel,
                        voiceChannel: connection,
                        connection  : null,
                        songs       : [],
                        volume      : 1,
                        playing     : true,
                    };

                    // On ajoute la queue du serveur dans la queue globale:
			        queue.set(message.guild.id, queueConstruct);
                    // On y ajoute la musique
                    queueConstruct.songs.push(results[0]);

                    try {
                        queueConstruct.connection = connection;
                        play(message.guild, queueConstruct.songs[0]);

                    } catch(err) {
                        console.log(err)
                    }

                } else {
                    serverQueue.songs.push(song);
                    return message.channel.send(`${song.title} est ajouter a la "play-list" .`);
                }
    
            });
        })
          
    }
}