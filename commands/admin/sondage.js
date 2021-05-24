const Discord = require('discord.js');

module.exports = {
	name: 'sondage',
	description: 'Commande pour lancée un sondage.',
	aliases: ['survey', 'sond'],
    categorie: "Admin",
	execute(message, arg) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous n'êtes pas Admin.")
        
        let yesPercent = 0;
        let noPercent = 0;
        let yes = 0;
        let no = 0;
        const msg = arg.join(' ');
        let barStat = ['⬜','⬜','⬜','⬜','⬜','⬜','⬜','⬜','⬜','⬜','⬜','⬜','⬜','⬜']

        // Embed
        let embed = new Discord.MessageEmbed()
        .setColor('3C3C3A')
        .setTitle('Sondage :')
        .addField(msg, barStat.join(''))
        .addField(":green_square: Oui", `${yesPercent}%`, true)
        .addField(":red_square: Non", `${noPercent}%`, true)
        .setFooter(`Sondage par ${message.author.tag}`)
        
        let msgEdit = message.channel.send(embed).then((m) => {
            m.react('✅')
            m.react('❌')

            m.client.on('messageReactionAdd', async (reaction, user) => {
                // Verifie que un autre bot ne réagie pas.
                if(user.bot) {
                    return
                }

                yes=m.reactions.cache.get('✅').count - 1;
                no=m.reactions.cache.get('❌').count - 1;
    
                yesPercent = Math.ceil((yes*100)/(yes+no)/5)*5;
                noPercent = Math.ceil((100 - yesPercent)/5)*5;

                for(i = 0; i < Math.round(((yesPercent/100)*barStat.length)); i++ ) {
                    barStat[i] = '🟩';
                }
    
                for(i = 0; i < Math.round(((noPercent/100)*barStat.length)); i++ ) {
                    barStat[i] = '🟥';
                }
                

                // Actualisation de l'embed.
                embed = new Discord.MessageEmbed()
                .setColor('3C3C3A')
                .setTitle('Sondage :')
                .addField(msg, barStat.join(''))
                .addField(":green_square: Oui", `${yesPercent}%`, true)
                .addField(":red_square: Non", `${noPercent}%`, true)
                .setFooter(`Sondage par ${message.author.tag}`)
    
                await m.edit(embed) // Edition du message.
            })
    
            m.client.on('messageReactionRemove', async (reaction, user) => {
                no=m.reactions.cache.get('❌').count - 1;
                yes=m.reactions.cache.get('✅').count - 1;
                
                yesPercent = Math.ceil((yes*100)/(yes+no)/5)*5;
                noPercent = Math.ceil((100 - yesPercent)/5)*5;
                
                if(isNaN(yesPercent)) yesPercent = 0;
                if(isNaN(noPercent)) noPercent = 0;

                if(yesPercent == 0 && noPercent == 0) {
                    for(i = 0; i < barStat.length; i++ ) {
                        barStat[i] = '⬜'
                    }
                }

                for(i = 0; i < Math.round(((yesPercent/100)*barStat.length)); i++ ) {
                    barStat[i] = '🟩';
                }
    
                for(i = 0; i < Math.round(((noPercent/100)*barStat.length)); i++ ) {
                    barStat[i] = '🟥';
                }

                // Actualisation de l'embed.
                embed = new Discord.MessageEmbed()
                .setColor('3C3C3A')
                .setTitle('Sondage :')
                .addField(msg, barStat.join(''))
                .addField(":green_square: Oui", `${yesPercent}%`, true)
                .addField(":red_square: Non", `${noPercent}%`, true)
                .setFooter(`Sondage par ${message.author.tag}`)

                await m.edit(embed) // Edition du message.

            });

        })
	},
};