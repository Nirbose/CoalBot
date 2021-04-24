const fs = require('fs');

module.exports = async (client, member) => {

    let rawdata = fs.readFileSync('./json/channel.json');
    let json_channel = JSON.parse(rawdata);
    
    const random = Math.floor(Math.random() * welcome.phrase.length);

    client.channels.cache.get(welcome.channel_id).send(`[ ${member.user.username} ] ` + welcome.phrase[random].replace('{user}', message.author));

}