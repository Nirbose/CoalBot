module.exports = {
	name: 'ping',
	description: 'Ping!',
	aliases: ['commands'],
	execute(message) {
		message.channel.send(`🏓Pong. *${message.createdTimestamp - Date.now()}ms.*`);
	},
};