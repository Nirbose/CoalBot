const fs = require('fs');
// const Canvas = require('canvas');
const Discord = require('discord.js')

module.exports = async (client, member) => {
    
    // let rawdata = fs.readFileSync('./json/channel.json');
    // let json_channel = JSON.parse(rawdata);

    // // Canvas génération.
    // const canvas = Canvas.createCanvas(700, 350);
    // const ctx = canvas.getContext('2d');
    // const text = canvas.getContext('2d');
    // const background = await Canvas.loadImage('./assets/imgs/bg.png');
    // const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));

    // ctx.strokeStyle = '#74037b';
    // ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    // ctx.drawImage(avatar, 25, canvas.height / 5, 200, 200);

    // // Name
    // text.font = '70px sans-serif';
	// text.fillStyle = '#212121';
    // text.background = '#212121';
	// text.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.75);

    // ctx.beginPath();
	// ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	// ctx.closePath();
	// ctx.clip();

    // const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-img.png');
    
    // const random = Math.floor(Math.random() * json_channel.welcome.phrase.length);

    // // Embed
    // const embed = new Discord.MessageEmbed()
    // .setColor('#3C3C3A')
    // .setAuthor(member.guild.name, member.guild.iconURL())
    // .setTitle('Welcome !')
    // .setDescription(json_channel.welcome.phrase[random].replace('{user}', member))
    // .attachFiles(attachment)
    // .setImage('attachment://welcome-img.png')
    // .setTimestamp()
    // client.channels.cache.get(json_channel.welcome.channel_id).send(embed);
    
}