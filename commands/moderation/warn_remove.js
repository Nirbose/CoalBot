const Discord = require('discord.js')
const fs = require('fs')

module.exports = {
    name: "warn_remove",
    description: "Permet de retirer 1 warn.",
    aliases: ["remove_warn"],
    execute(message, args) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send("Spécifier un utilisateur s'il vous plaît.");

        if(!member) return message.channel.send("Je ne trouve pas l'utilisateur.");

        if(member.id === message.author.id) return message.channel.send("Vous ne pouvez pas vous auto warn_remove.");

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Pas de raison';

        // Vérification de permition
        tools.verif(message, 2);

        let rawdata = fs.readFileSync("./json/warn.json");
        let data = JSON.parse(rawdata);

        for (let i = 0; i < data.user.length; i++) {
            const element = data.user[i];
            if(element.user_id == member.id) {
                
                element.nb_warn -= 1;

                if (element.nb_warn == 0) {
                    data.user.splice(i, 1);

                    let remove = JSON.stringify(data, null, 2);

                    fs.writeFile('./json/warn.json', remove, (err) => {
                        if (err) throw err;
                        console.log('Data written to file');
                    });

                    const embed = new Discord.MessageEmbed()
                    .setColor('#3C3C3A')
                    .setTitle('Warn Remove')
                    .addFields(
                        {name: 'User Warn Remove', value: `${member}`},
                        {name: 'Warn Remove par', value: `${message.author}`},
                        {name: 'Raison', value: `${reason}`},
                        {name: "Nombre de Warn :", value: `${element.nb_warn}`}
                    )
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()

                    return message.channel.send(embed);

                } else {
                    let remove = JSON.stringify(data, null, 2);

                    fs.writeFile('./json/warn.json', remove, (err) => {
                        if (err) throw err;
                        console.log('Data written to file');
                    });

                    const embed = new Discord.MessageEmbed()
                    .setColor('#3C3C3A')
                    .setTitle('Warn Remove')
                    .addFields(
                        {name: 'User Warn Remove', value: `${member}`},
                        {name: 'Warn Remove par', value: `${message.author}`},
                        {name: 'Raison', value: `${reason}`},
                        {name: "Nombre de Warn :", value: `${element.nb_warn}`}
                    )
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()

                    return message.channel.send(embed);
                }

            }
            
        }

        message.channel.send("L'utilisateur n'existe pas.")
    }
}