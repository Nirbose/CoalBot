const fs = require('fs');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database("./db/database.db");

module.exports = async (client, oldMember, newMember) => {
    let newUserChannel = newMember.channelID;
    let oldUserChannel = oldMember.channelID;

    if(newMember.channel) {
        
        // supprime de force l'ancien voc de l'user.
        if(oldMember.channel) {

            for (let i = 0; i < client.voiceCreate.length; i++) {
    
                if(oldMember.channel.members.size === 0){
                    if(oldUserChannel === client.voiceCreate[i]) {
                        oldMember.channel.delete()
                    }
                };
                        
            }
        }

        db.all(`SELECT * FROM channels`, (err, rows) => {

            rows.forEach(channel => {

                if(channel.name == "voice") {

                    if(newUserChannel === channel.channelId) {

                        newMember.channel.guild.channels.create(`Chez ${newMember.member.user.username}`,{
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
                            client.voiceCreate.push(`${c.id}`);
                        });
    
                        return;
                    }

                }

            });

        });
    }


    if(oldMember.channel) {

        for (let i = 0; i < client.voiceCreate.length; i++) {

            if(oldMember.channel.members.size === 0){
                if(oldUserChannel === client.voiceCreate[i]) {
                    oldMember.channel.delete()
                }
            };
                    
        }
    }
}