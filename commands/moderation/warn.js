const fs = require('fs');
const Discord = require('discord.js')

module.exports = {
    name: "warn",
    description:"Permet de mettre un avertissement",
    categorie: "Moderation",
    execute(message, args) {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send("Spécifier un utilisateur s'il vous plaît.");

        if(!member) return message.channel.send("Je ne trouve pas l'utilisateur.");

        if(member.id === message.author.id) return message.channel.send("Vous ne pouvez pas vous auto warn.");

        let reason = args.slice(1).join(" ");

        if(!reason) { reason = 'Pas de raison';}

        let rawdata = fs.readFileSync("./json/warn.json");
        let data = JSON.parse(rawdata);

        console.log(data);
        
        for (let index = 0; index < data.user.length; index++) {
            
            if(member.id === data.user[index].user_id) {
                number = data.user[index].nb_warn += 1;
                let push = JSON.stringify(data, null, 2);
                fs.writeFile('./json/warn.json', push, (err) => {
                    if (err) throw err;
                    console.log('On ne peux pas écrir');
                });

                const embed = new Discord.MessageEmbed()
                .setColor('#3C3C3A')
                .setTitle('Warn')
                .addFields(
                    {name: 'User Warn', value: `${member}`},
                    {name: 'Warn par', value: `${message.author}`},
                    {name: 'Raison', value: `${reason}`},
                    {name: "Nombre de Warn :", value: `${number}`}
                )
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                return message.channel.send(embed)
            }
            
        }

        data.user.push({user_id: member.id, nb_warn: 1});
        let push = JSON.stringify(data, null, 2);
        fs.writeFile('./json/warn.json', push, (err) => {
            if (err) throw err;
            console.log('On ne peux pas écrir');
        });
        const embed = new Discord.MessageEmbed()
        .setColor('#3C3C3A')
        .setTitle('Warn')
        .addFields(
            {name: 'User Warn', value: `${member}`},
            {name: 'Warn par', value: `${message.author}`},
            {name: 'Raison', value: `${reason}`},
            {name: "Nombre de Warn :", value: `1`}
        )
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

        message.channel.send(embed)

    }
}