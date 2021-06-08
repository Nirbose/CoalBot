module.exports = {
    name: 'join',
    description: "Commande qui permet de faire rejoindre le bot dans le salon vocal où nous nous trouvons.",
    categorie: "Music",
    execute(message) {
        if(!message.member.voice.channel) return message.channel.send('Vous devez être connectez dans un vocal pour effectuer cette commande.');

        message.member.voice.channel.join()
    }
}