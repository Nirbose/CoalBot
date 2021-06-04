const Mee6LevelsApi = require("mee6-levels-api");
const Discord = require('discord.js');
// const Canvas = require('canvas');

module.exports = {
    name: "rank",
    description: "",
    aliase: ['level'],

    // execute(message) {
    //     const guildId = message.guild.id;
    //     const userId = message.author.id;
        
    //     Mee6LevelsApi.getUserXp(guildId, userId).then(async user => {
    //         console.log(`${user.tag} is at level ${user.xp.levelXp} and rank ${user.rank}.`);

    //         // Canvas génération.
    //         const canvas = Canvas.createCanvas(700, 350);
    //         const ctx = canvas.getContext('2d');
    //         const text = canvas.getContext('2d');
    //         const levelBar = canvas.getContext('2d');
    //         const background = await Canvas.loadImage('./assets/imgs/bg.png');
    //         const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }));

    //         ctx.strokeStyle = '#74037b';
    //         ctx.strokeRect(0, 0, canvas.width, canvas.height);

    //         ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    //         ctx.drawImage(avatar, 25, canvas.height / 5, 200, 200);

    //         text.font = 'bold 45px sans-serif';
    //         text.fillStyle = '#212121';
    //         text.background = '#212121';
    //         text.fillText(`${message.author.username}!`, canvas.width / 3, canvas.height / 3);

    //         levelBar.fillStyle = "#212121";
    //         levelBar.fillRect(500, 300, 450, 25);
    //         levelBar.lineJoin = "round";
    //         levelBar.lineWidth = 50;
    //         levelBar.strokeRect(canvas.width, canvas.height / 1.5, 450, 1);
            
    //         ctx.beginPath();
    //         ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    //         ctx.closePath();
    //         ctx.clip();

    //         // Message 
    //         const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'rank-img.png');

    //         const embed = new Discord.MessageEmbed()
    //         .setColor("#3C3C3A")
    //         .setTitle(user.username + " Rank")
    //         .setDescription(`Voilà votre rang ${user.username} !`)
    //         .attachFiles(attachment)
    //         .addFields(
    //             {name: "Level :", value: user.level, inline: true},
    //             {name: "rang", value: user.rank, inline: true}
    //         )
    //         .setImage('attachment://rank-img.png')
    //         .setTimestamp()

    //         message.channel.send(embed);
    //     });
    // }
}