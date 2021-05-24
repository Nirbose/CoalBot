module.exports = {
    name: "clear",
    description: "Supprimé des messages",
    categorie: "Moderation",
    execute(message) {

        const args = message.content.split(' ').slice(1);
        const amount = args.join(' ');

        if (!amount) return message.reply('Il me faut le nombre de messages à supprimer !');
        if (isNaN(amount)) return message.reply('Cela doit être un chiffre !...');

        if (amount > 100) return message.reply('Je ne peux pas faire plus de 100 messages !');
        if (amount < 1) return message.reply('Je ne peux pas faire moins que 1 message !');

        message.channel.messages.fetch({ limit: parseInt(amount) + 1 }).then(messages => {
            message.channel.bulkDelete(messages)
        });

        message.channel.send(`${parseInt(amount) + 1} messages, on était supprimé.`).then(msg => {
            msg.delete({timeout: 3000, reason: 'clear'});
        })

    }
}