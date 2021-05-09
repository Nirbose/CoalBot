const Discord = require('discord.js');

module.exports = {
    name: "choice",
    description: "",
    aliases: ['sondage_choice', 'sond_choice'],
    execute(message, args) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous n'êtes pas Admin.");

        if(!args[0]) return message.reply("Vous devez me donner un nombre !");
        if(isNaN(args[0])) return message.reply("Vous devez me donner un nombre !");
        if(args[0] > 9) return message.reply("Vous ne pouvez pas donner un chiffre supérieur a 9.");
        if(args[0] < 1) return message.reply("Vous ne pouvez pas donner un chiffre inférieur a 1.");

        const number = args[0].toString();

        const msg = args.slice(1).join(" ");

        if(msg[0] !== '[' || msg[msg.length - 1] !== ']') return message.reply("Vous devez avoir un taleau commancent par **[** et finisant par **]** pour la descrption des choix possibles.");

        let emojie_table = [{
            1: "one",
            2: "two",
            3: "three",
            4: "four",
            5: "five",
            6: "six",
            7: "seven",
            8: "eight",
            9: "nine"
        }]

        let field = msg.match('\[\  \^\,\:\!\?\.\/[a-zA-Z0-9]+\]');
        field = field[0];
        field = field.replace('[', '');
        field = field.replace(']', '');

        let result = field.split(',');

        const embed = new Discord.MessageEmbed()
        .setColor('3C3C3A')
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))

        for (let index = 0; index < number; index++) {
            embed.addField(`:${emojie_table[0][index + 1]}:`, result[index], true)
        }

        message.channel.send(embed)
    }
}