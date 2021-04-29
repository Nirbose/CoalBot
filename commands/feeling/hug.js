const tenor = require('../../util/function/tenor_api.js');

module.exports = {
    name: "hug",
    description: "Cette commande permet de faire un câlin à quelqu'un.",
    execute(message, args) {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        // Si pas de mention
        if(!args[0]) return tenor.gifs(message, 'anim+hug', 'fait un câlin à');

        // Sinon
        tenor.gifs(message, 'anim+hug', 'fait un câlin à', member);

    }
}