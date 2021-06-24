module.exports = {
	name: 'reload',
	description: 'Reload tout le bot',
	aliases: ['commands'],
	categorie: "👑 - Admin",
	execute(message) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous n'êtes pas Admin.")
		
        process.exit()
	},
};