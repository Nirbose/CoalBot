const fs = require('fs');
const Canvas = require('canvas');
const Discord = require('discord.js')
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database("./db/database.db")

const phrase = ["Bien la bienvenue {user}", "Tu as ramené de la pizza {user} ?"]

module.exports = async (client, member) => {

    let count = 0
    // Check pseudo //
    if(/[^\u0000-\u007f]/.test(member.user.username)) {
        db.run(`INSERT INTO invalidName (userName, userID) VALUES (?,?)`, [member.user.username, member.user.id])
		db.all(`SELECT * FROM invalidName`, (err, rows) => {
            find = false;
            rows.forEach(element => {
                count += 1
            });
            member.setNickname(`PSEUDO INCORECT ${count}`)
        });
	}

    // end check pseudo //

    // Canvas génération.
    const canvas = Canvas.createCanvas(700, 350);
    const ctx = canvas.getContext('2d');
    const text = canvas.getContext('2d');
    const background = await Canvas.loadImage('./app/imgs/bg.png');
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(avatar, 25, canvas.height / 5, 200, 200);

    // Name
    text.font = '70px sans-serif';
	text.fillStyle = '#212121';
    text.background = '#212121';
	text.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.75);

    ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-img.png');
    
    const random = Math.floor(Math.random() * phrase.length);

    // Embed
    const embed = new Discord.MessageEmbed()
    .setColor(process.color)
    .setAuthor(member.guild.name, member.guild.iconURL())
    .setTitle('Welcome !')
    .setDescription(phrase[random].replace('{user}', member))
    .attachFiles(attachment)
    .setImage('attachment://welcome-img.png')
    .setTimestamp()
    db.all(`SELECT * FROM channels`, (err, rows) => {
        rows.forEach(channel => {
            if(channel.name == "welcome") client.channels.cache.get(channel.channelId).send(embed);
        });
    })


    /**   Stats partie   **/

    let d = new Date();
    let d_year = d.getFullYear();
    let d_mouth = d.getMonth() + 1;

    let find;

    db.all(`SELECT * FROM stats`, (err, rows) => {
        find = false;
        rows.forEach(element => {
            if(element.month == d_mouth && element.year == d_year) {
                db.run(`UPDATE stats SET joine = ${element.joine+=1} WHERE id = ${element.id}`);
                find = true;
            }
        })
        if(find == false) db.run(`INSERT INTO stats (year, month, joine, leave) VALUES (${d_year}, ${d_mouth}, '1', '0')`);
        
    })

    find = false

    db.all(`SELECT * FROM channels`, (err, rows) => {

        rows.forEach(channel => {
            if(channel.name == "log") {
                let date = new Date(member.user.createdTimestamp)

                const embed = new Discord.MessageEmbed()
                .setColor(process.color)
                .setAuthor(member.guild.name, message.guild.iconURL())
                .setTitle(member.user.username + ' | New Member')
                .setThumbnail(member.user.avatarURL())
                .setDescription(`**${message.author.username}** vient d'arriver sur le serveur, voilà toutes les informations le concernant. `)
                .addFields(
                    {name: 'Pseudo :', value: member.user, inline: true},
                    {name: 'Creation compte :', value: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`, inline: true},
                    {name: 'ID :', value: member.user.id, inline: true}
                )
                .setTimestamp()

                if(find == false) client.channels.cache.get(channel.channelId).send(embed);
            }
        })
    })
}