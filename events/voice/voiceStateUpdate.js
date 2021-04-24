const id_voc = [];
const fs = require('fs')

module.exports = async (client, oldMember, newMember) => {
    let newUserChannel = newMember.channelID;
    let oldUserChannel = oldMember.channelID;
        
    let rawdata = fs.readFileSync('./json/channel.json');
    let json_channel = JSON.parse(rawdata);

    var i;
    if(newMember.channel) {
        for (i = 0; i < json_channel['voc_channel'].length; i++) {
            if(newUserChannel === json_channel['voc_channel'][i]) {

                newMember.channel.guild.channels.create(`salon de ${newMember.member.user.username}`,{
                    type: 'voice',
                    permissionOverwrites: [
                        {
                            id: newMember.member.user.id,
                            allow: ['VIEW_CHANNEL'],
                        },
                        {
                            id: newMember.guild.id,
                            deny: ['VIEW_CHANNEL'],
                        },
                    ],
                }).then(c=>{
                    c.setParent(client.channels.cache.get(newUserChannel).parent);
                    newMember.setChannel(c);
                    id_voc.push(`${c.id}`);
                });

                return;
            }
        }
    }


    if(oldMember.channel) {

        for (var a = 0; a < id_voc.length; a++) {

            if(oldMember.channel.members.size === 0){
                if(oldUserChannel === id_voc[a]) {
                    oldMember.channel.delete()
                }
            };
                    
        }
    }
}