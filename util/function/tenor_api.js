const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { tenor_key } = require("../../config.json");

module.exports = {
    gifs: function(message, query, embedDescription, user = "personne") {
        let apikey = tenor_key;
        let lmt = 20;

        fetch(`https://api.tenor.com/v1/search?q=${query}&key=${apikey}&limit=${lmt}`)
        .then(response => response.json())
        .then(data => {
            const random = Math.floor(Math.random() * data.results.length);

            const embed = new MessageEmbed()
            .setColor('#3C3C3A')
            .setTitle('Feeling !')
            .setDescription(`${message.author} ${embedDescription} ${user}`)
            .setImage(data.results[random].media[0].gif.url)
            .setTimestamp()

            message.channel.startTyping();
            setTimeout(function(){
                message.channel.stopTyping();
                message.channel.send(embed);
            }, 1000);

        })

    }
}