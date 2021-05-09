const tenor = require('../../assets/function/tenor_api.js');

module.exports = {
    name: "kiss",
    description: "Cette commande permet de faire un bisous à quelqu'un.",
    execute(message, args) {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        // Si pas de mention
        if(!args[0]) return tenor.gifs(message, 'anim+kiss', 'fait un bisous à');

        // Sinon
        tenor.gifs(message, 'anim+kiss', 'fait un bisous à', member);

    }
}