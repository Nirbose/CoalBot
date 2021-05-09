module.exports = {
    name: 'join',

    execute(message) {
        if(!message.member.voice.channel) return message.channel.send('Vous devez être connectez dans un voval pout effectuer cette commande.');

        message.member.voice.channel.join()
    }
}