const Discord = require('discord.js');

module.exports = {
    name: "hypesquad", 
    description: "Game test",
    categorie: "Game",
    execute(message) {
        const embed = new Discord.MessageEmbed()
        .setTitle('HypeSquad Battel')
        .setDescription("Réagissez a l'emoji de votre badge !")
        .setColor('3C3C3A')
        .addFields(
            {name: '<:HOUSE_BALANCE:853300025014091787> - Balance', value: '0', inline:true},
            {name: '<:HOUSE_BRILLIANCE:853301117211377724> - Brilliance', value: '0', inline:true},
            {name: '<:HOUSE_BRAVERY:853300026074726441> - Bravery', value: '0', inline:true},
        )
        .setTimestamp()

        message.channel.send(embed).then(msg => {
            msg.react('<:HOUSE_BALANCE:853300025014091787>'); // #44dcc3
            msg.react('<:HOUSE_BRILLIANCE:853301117211377724>'); // #f47c64
            msg.react('<:HOUSE_BRAVERY:853300026074726441>'); // #9c84ec

            let save = {'853300025014091787': 0, '853301117211377724': 0, '853300026074726441': 0};
            let colors = {'853300025014091787': '44dcc3', '853301117211377724': 'f47c64', '853300026074726441': '9c84ec'};

            // Event reaction
            message.client.on('messageReactionAdd', async (messageReaction, user) => {

                if(user.bot) return;

                if(!user.flags.toArray().includes(messageReaction._emoji.name)) return messageReaction.users.remove(user.id);

                if(save[`${messageReaction._emoji.id}`] == null) return messageReaction.remove();

                save[`${messageReaction._emoji.id}`]++;

                let balance = msg.reactions.cache.get('853300025014091787').count;
                let brillance = msg.reactions.cache.get('853301117211377724').count;
                let bravery = msg.reactions.cache.get('853300026074726441').count;
                let color;

                if(isNaN(balance)) balance = 0;
                if(isNaN(brillance)) brillance = 0;
                if(isNaN(bravery)) bravery = 0;

                if(balance > brillance && balance > bravery) {
                    color = colors['853300025014091787'];
                } else if(brillance > bravery && brillance > brillance) {
                    color = colors['853301117211377724'];
                } else if(bravery > balance && bravery > brillance) {
                    color = colors['853300026074726441'];
                } else {
                    color = '3C3C3A';
                }

                const embed = new Discord.MessageEmbed()
                .setTitle('HypeSquad Battel')
                .setDescription("Réagissez a l'emoji de votre badge !")
                .setColor(color)
                .addFields(
                    {name: '<:HOUSE_BALANCE:853300025014091787> - Balance', value: save['853300025014091787'], inline:true},
                    {name: '<:HOUSE_BRILLIANCE:853301117211377724> - Brilliance', value: save['853301117211377724'], inline:true},
                    {name: '<:HOUSE_BRAVERY:853300026074726441> - Bravery', value: save['853300026074726441'], inline:true},
                )
                .setTimestamp()

                msg.edit(embed)
                
            });

            message.client.on('messageReactionRemove', async (messageRemove, user) => {
                if(user.bot) return;

                if(!user.flags.toArray().includes(messageRemove._emoji.name)) return messageRemove.users.remove(user.id);

                if(save[`${messageRemove._emoji.id}`] == null) return messageRemove.remove();

                save[`${messageRemove._emoji.id}`] -= 1;

                let balance = msg.reactions.cache.get('853300025014091787').count;
                let brillance = msg.reactions.cache.get('853301117211377724').count;
                let bravery = msg.reactions.cache.get('853300026074726441').count;
                let color;

                if(isNaN(balance)) balance = 0;
                if(isNaN(brillance)) brillance = 0;
                if(isNaN(bravery)) bravery = 0;

                if(balance > brillance && balance > bravery) {
                    color = colors['853300025014091787'];
                } else if(brillance > bravery && brillance > brillance) {
                    color = colors['853301117211377724'];
                } else if(bravery > balance && bravery > brillance) {
                    color = colors['853300026074726441'];
                } else {
                    color = '3C3C3A';
                }

                const embed = new Discord.MessageEmbed()
                .setTitle('HypeSquad Battel')
                .setDescription("Réagissez a l'emoji de votre badge !")
                .setColor(color)
                .addFields(
                    {name: '<:HOUSE_BALANCE:853300025014091787> - Balance', value: save['853300025014091787'], inline:true},
                    {name: '<:HOUSE_BRILLIANCE:853301117211377724> - Brilliance', value: save['853301117211377724'], inline:true},
                    {name: '<:HOUSE_BRAVERY:853300026074726441> - Bravery', value: save['853300026074726441'], inline:true},
                )
                .setTimestamp()

                msg.edit(embed)
            });
        });
    }
}