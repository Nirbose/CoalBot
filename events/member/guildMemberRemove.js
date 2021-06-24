const fs = require('fs');

module.exports = async (client, member) => {
    /**   Stats partie   **/

    let d = new Date();
    let d_year = d.getFullYear();
    let d_mouth = d.getMonth() + 1;

    const sqlite3 = require('sqlite3');
    let db = new sqlite3.Database("./db/database.db")
    let find;

    db.all(`SELECT * FROM stats`, (err, rows) => {
        find = false;
        rows.forEach(element => {
            if(element.month == d_mouth && element.year == d_year) {
                db.run(`UPDATE stats SET leave = ${element.leave+=1} WHERE id = ${element.id}`);
                find = true;
            }
        })
        if(find == false) db.run(`INSERT INTO stats (year, month, joine, leave) VALUES (${d_year}, ${d_mouth}, '0', '1')`);
        
    })

    /**   End Stats partie   **/

    db.all(`SELECT * FROM channels`, (err, rows) => {
        find = false

        rows.forEach(channel => {
            if(channel.name == "log") {
                const embed = new Discord.MessageEmbed()
                .setColor('3C3C3A')
                .setAuthor(member.guild.name, member.guild.iconURL())
                .setTitle('Member Remove :')
                .setDescription(`${member} vient de partir du serveur.`)
                .setThumbnail(member.user.avatarURL())
                .setTimestamp()

                if(find == false) client.channels.cache.get(channel.channelId).send(embed);
            }
        })
    })
}