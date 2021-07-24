module.exports = {
    name: 'args',
    args: true,
    usage: '[arg]',
    execute(message) {
        message.channel.send('args');
    }
}