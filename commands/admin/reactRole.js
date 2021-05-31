module.exports = {
    name: "reac",
    description: "Permet d'ajouter ou de supprimer un role avec des réactions'",
    categorie: "Admin",
    execute(message, arg) {
        let chan_id = arg[1].split(/[^0-9]/)[2];
        let mode = arg[0];
        let messageId = arg[2];
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous n'êtes pas Admin.")
        if(mode != 'ajouter' && mode != 'retirer') return message.channel.send("Vous devez entrée la commande sous cette forme: `!reactionRole *ajouter/retirer* *channel* *id message* *role*`");
        if(message.guild.channels.cache.get(chan_id) === undefined) return message.channel.send("Ce channel n'existe pas !")
        
        //ne marche pas
        message.client.channels.cache.get(chan_id).messages.fetch(messageId)

    }
}