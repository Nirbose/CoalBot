const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');

module.exports = {
    name: "play",
    description: "Commande permettant de jouer une musique ou la mettre dans la playliste/file d'attente.",
    aliases: ['p'],
    categorie: "Music",

    async execute(message, args) {
        const queue = message.client.music;
        let find = false;

        // Fonction play pour exuter la musique
        let self = function play(song, connection, noNext = true) {
            find = true;
            message.client.serverQueue = queue.get(message.guild.id);

            if(!message.client.serverQueue) {
                message.channel.send('😅 - Youtube en bazarre')
                message.client.serverQueue = {
                    songs: [],
                    playing: true,
                    connection: null,
                };
    
                queue.set(message.guild.id, message.client.serverQueue);
                message.client.serverQueue.songs.push(song);
    
                message.client.serverQueue.connection = connection;
    
                const embed = new Discord.MessageEmbed()
                    .setTitle(`${song.title}`)
                    .setColor('#3C3C3A')
                    .setDescription(`🎶 - Je lance **${song.title}** de la chaîne de __${song.author.name}__ !`)
                    .addFields(
                        {name: "Views :", value: song.views, inline: true},
                        {name: "Durée :", value: song.duration, inline: true}
                    )
                    .setImage(song.thumbnails[0].url)
                    .setFooter(message.author.username, message.author.avatarURL())
                    .setTimestamp()
    
                message.channel.send(embed)
            }
            else {

                message.client.serverQueue.songs.push(song);

                if(noNext) {

                    const embed = new Discord.MessageEmbed()
                    .setColor('#3C3C3A')
                    .setTitle('🔊・Ajouter à la playliste')
                    .setDescription(`**${song.title}** a été ajouté à la playliste actuellement construite. 🎵`)
                    .addFields(
                        {name: "Views :", value: song.views, inline: true},
                        {name: "Durée :", value: song.duration, inline: true}
                    )
                    .setImage(song.thumbnails[0].url)
                    .setFooter(message.author.username, message.author.avatarURL())
                    .setTimestamp()
    
                    return message.channel.send(embed);
                }
            }
    
            try {
    
                // message.channel.send("😅 Youtube en bazarre")
                const song_exec = connection.play(ytdl(song.url, { filter: 'audioonly' } )).on('finish', () => {
                    message.client.serverQueue.songs.shift();
                    self(message.client.serverQueue.songs[0], connection, false);
    
                    try {
                        const embed = new Discord.MessageEmbed()
                        .setTitle(`${message.client.serverQueue.songs[0].title}`)
                        .setColor('#3C3C3A')
                        .setDescription(`🎶 - Je lance **${message.client.serverQueue.songs[0].title}** de la chaîne de __${message.client.serverQueue.songs[0].author.name}__ !`)
                        .addFields(
                            {name: "Views :", value: song.views, inline: true},
                            {name: "Durée :", value: song.duration, inline: true}
                        )
                        .setImage(message.client.serverQueue.songs[0].thumbnails[0].url)
                        .setFooter(message.author.username, message.author.avatarURL())
                        .setTimestamp()

                        message.channel.send(embed)
                    } catch(err) {
                        return;
                    }

                });
    
                song_exec.setVolume(0.5);
            } catch(err) {
                return;
            }
        }


        // Verification
        if(!message.member.voice.channel) return message.channel.send('Vous devez être connectez dans un voval pout effectuer cette commande.');
        if(!args[0]) return message.channel.send("Vous devez me donner la musique a lancer.")

        const arg = args.slice(0).join(" ");
        message.channel.send('🔍 - Je cherche votre musique sur le net et je la charge.')

        // Connexion au salon vocal
        let c = message.member.voice.channel.join()
        .then(async connection => {

            // Cherche sur youtube
            const results = await ytsr(arg);

            for (let i = 0; i < results.items.length; i++) {
                const element = results.items[i];

                if(find) {
                    return;
                }

                if(element.type == 'video') {
                    self(element, connection);
                }
                
            }

        })
          
    }
}