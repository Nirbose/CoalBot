const Discord = require('discord.js');

module.exports = {
    name: "battle",
    description: "",

    execute(message) {

        let emoji_list = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
        let user_id = [];

        message.delete();

        const embed = new Discord.MessageEmbed()
        .setColor("#3C3C3A")
        .setTitle("Buld'o Battle Royale !")
        .setDescription("Préparez-vous à cette bataille en cochant la réaction ! Vous avez 5min")
        .setFooter(message.author.username, message.author.avatarURL())
        .setTimestamp()
        message.channel.send(embed).then(msg => {
            msg.react("💥");
            msg.react("▶");

            const Collector = msg.createReactionCollector((reaction, user) => user.bot == false);

            Collector.on('collect', async(reaction) => {
                if(reaction.emoji.toString() === "💥") {
                    if(reaction.users.cache.last().id.toString() in user_id) {
                        console.log('non')
                        message.channel.send(`${reaction.users.cache.last()}, vous êtes déjà dans la partie.`).delete({timeout: 5000});
                    } else {
                        user_id.push(reaction.users.cache.last().id);
                    }
                    console.log(user_id);
                    
                }
            })
        });

        message.channel.send('oket');

    }
}