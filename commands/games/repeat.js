const Discord = require('discord.js');

module.exports = {
    name: "repeat",
    description: "Commande pour jouer a repeat avec le bot.",
    categorie: "🕹 - Games",
    execute(message) {

        let block = "⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜\n";
        let fullBlock = block.repeat(6);
        fullBlock = fullBlock.split('')
        let position = 0;
        fullBlock[position] = '🍉';
        fullBlock = fullBlock.toString().replace(/,/g, '')

        let userGameArray = [];

        const embed = new Discord.MessageEmbed()
        .setColor('3C3C3A')
        .setDescription(fullBlock)
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL())
        
        message.channel.send(embed).then(m => {
            m.react('◀️');
            m.react('▶️');

            userGameArray.push({userId: message.author.id, messageId: m.id})

            m.client.on('messageReactionAdd', async (reaction, user) => {
                if(user.bot) return;

                if(reaction.emoji.name == '▶️') {
                    let block = "⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜\n";
                    let fullBlock = block.repeat(6);
                    fullBlock = fullBlock.split('')
                    fullBlock[position++] = '🍉';
                    fullBlock = fullBlock.toString().replace(/,/g, '')

                    const newEmbed = new Discord.MessageEmbed()
                    .setColor('3C3C3A')
                    .setDescription(fullBlock)
                    .setTimestamp()
                    .setFooter(message.author.username, message.author.avatarURL())

                    await m.edit(newEmbed)
                } else if(reaction.emoji.name == '◀️') {
                    let block = "⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜\n";
                    let fullBlock = block.repeat(6);
                    fullBlock = fullBlock.split('')
                    fullBlock[position -= 1] = '🍉';
                    fullBlock = fullBlock.toString().replace(/,/g, '')

                    const newEmbed = new Discord.MessageEmbed()
                    .setColor('3C3C3A')
                    .setDescription(fullBlock)
                    .setTimestamp()
                    .setFooter(message.author.username, message.author.avatarURL())

                    await m.edit(newEmbed)
                }

                await reaction.users.remove(user.id)
            })
        })

    }
}