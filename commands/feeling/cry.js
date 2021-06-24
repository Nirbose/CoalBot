const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "cry",
    description: "Cette commande permet de pleurer sur quelqu'un.",
    categorie: "🔥 - Feeling",
    execute(message, args) {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        let feeling = "cry";
        let random = true;

        fetch(`https://enzia.toile-libre.org/cdn/feeling/?feeling=${feeling}&random=${random}`)
        .then(response => response.json())
        .then(data => {
            let user;

            // Si pas de mention
            if(!member) {
                user = "personne";
            } else {
                user = member;
            }
            
            const embed = new MessageEmbed()
            .setColor('#3C3C3A')
            .setTitle('Feeling !')
            .setDescription(`${message.author} pleure sur l\'épole de ${user}`)
            .setImage(data.link)
            .setTimestamp()
            message.channel.startTyping();
            setTimeout(function(){
                message.channel.stopTyping();
                message.channel.send(embed);
            }, 1000);
        });

    }
}