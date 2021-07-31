module.exports = {
    name: 'radio',
    description: 'Radio Command',
    categorie: "Music",
    execute(message) {
        if(!message.member.voice.channel) return message.reply('il faut se trouver dans un voc.');

        message.member.voice.channel.join()
        .then(connection => {
            connection.play('http://cdn.nrjaudio.fm/audio1/fr/30001/mp3_128.mp3?origine=fluxradios');
        })
    }
}