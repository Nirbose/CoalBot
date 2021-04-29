const Discord = require('discord.js');

module.exports = {
    name: 'cusiner',
    description: 'Commande pour cuisiner.',
    execute(message, args) {

        if(args.length) {
            const plat = args[0];
            const embed = new Discord.MessageEmbed()
            .setColor('#3C3C3A')
            .addFields({name: `Votre commande !`, value: `Vous avez commandez un(e) ${plat}, validez vous ? `})
            .setTimestamp();
            message.channel.send(embed).then(embedMessage => {
                embedMessage.react("✅");
                embedMessage.react("❌");
                const filter = (reaction, user) => {
                    return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
                };

                embedMessage.awaitReactions(filter, { max: 1, time: 20000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();

                        if (reaction.emoji.name === '✅') {
                            message.reply('Votre plat est en préparation.');
                        } else {
                            message.reply('Votre plat a été annuler.');
                        }
                    })
                    .catch(collected => {
                        message.reply('Vous n\'avais pas réagie, votre plat a été annuler.');
                    });
            });

        } else {
            const embed = new Discord.MessageEmbed()
            .setColor('#3C3C3A')
            .addFields({name: `Vous ne commandez rien ?`, value: `Veillez justifier se que vous commander.`})
            .setTimestamp();
            message.channel.send(embed);
        }
    }
}