const tenor = require('../../assets/function/tenor_api.js');

module.exports = {
    name: "cry",
    description: "Cette commande permet de pleurer sur quelqu'un.",
    execute(message, args) {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        // Si pas de mention
        if(!args[0]) return tenor.gifs(message, 'anim+cry', 'pleure sur l\'épole de');

        // Sinon
        tenor.gifs(message, 'anim+cry', 'pleure sur l\'épole de ', member);

    }
}