module.exports = {
	name: 'reload',
	description: 'Reload tout le bot',
	aliases: ['commands'],
	categorie: "Admin",
	execute(message) {
        process.exit()
	},
};