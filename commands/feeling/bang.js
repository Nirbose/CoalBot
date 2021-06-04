const tenor = require('../../assets/function/tenor_api.js');

module.exports = {
    name: "bang",
    description: "Cette commande permet de frapper quelqu'un.",
    categorie: "feeling",
    execute(message, args) {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        // Si pas de mention
        if(!args[0]) return tenor.gifs(message, 'anim+bang', 'frappe');

        // Sinon
        tenor.gifs(message, 'anim+bang', 'frappe', member);

    }
}