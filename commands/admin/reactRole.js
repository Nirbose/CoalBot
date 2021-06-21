const fs = require('fs');
const Discord = require('discord.js')
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database("./db/database.db")


module.exports = {
    name: "reac",
    description: "Permet d'ajouter ou de supprimer un role avec des réactions'",
    categorie: "Admin",
    execute(message, arg) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous n'êtes pas Admin.");
        
        let roleId;
        let messageId;
        let chan_id;
        let mode = arg[0];
        let field = [];

        if(mode == 'list') {
            db.all(`SELECT messageId, COUNT(*) FROM role GROUP BY messageId HAVING COUNT(*) > 0`, (err, rows) => {
                if(err) {
                    console.log(err);
                }
                for(let i = 0; i < rows.length; i++) {
                    db.all(`SELECT * FROM role WHERE messageId = ${rows[i].messageId}`, (err, rows) => {
                        if(err) {
                            console.log(err);
                        }
                        
                        rows.forEach(element => {
                            field.push({name: 'Infos: ', value: `L'emojie ${element.emoji} ${element.mode} le role <@&${element.role}>`})
                            msgId = element.messageId
                            chanId = element.channelId
                        })
                        
                        const embed = new Discord.MessageEmbed()
                        .setColor('#3C3C3A')
                        .setTitle('RecapList')
                        .addFields({name: 'Message : Channel', value: `${msgId} Dans <#${chanId}>`},field)
                        .setTimestamp()
                
                        message.channel.send(embed)
                        field = []
                    })
                }
            })

        } else {

            try {
                if(mode != 'ajouter' && mode != 'retirer') return message.channel.send("Vous devez entrée la commande sous cette forme: `!reac *ajouter/retirer* *channel* *id message* *role*`");
            
                chan_id = arg[1].split(/[^0-9]/)[2];
                if(message.guild.channels.cache.get(chan_id) === undefined) return message.channel.send("Ce channel n'existe pas !")
                
                messageId = arg[2];
                
                roleId = arg[3].split(/[^0-9]/)[3];
            } catch {
                return message.channel.send("Vous devez entrée la commande sous cette forme: `!reac *ajouter/retirer* *channel* *id message* *role*`");
            }

            if(message.guild.roles.cache.get(roleId) === undefined) return message.channel.send("Ce role n'existe pas !")
            
            let msg = message.client.channels.cache.get(chan_id).messages.fetch(messageId);
            message.client.channels.cache.get(chan_id).messages.fetch({ limit: 50 }).then(messages => {
    
                if(messages.has(messageId) == false) return message.channel.send('Ce message est introuvable')
    
                message.channel.send(`Ajouter a ce message la réaction que vous souhaitez pour ${mode} ce role`).then((messages => {
                    
                    message.channel.messages.fetch({ limit: 1 }).then(messages => {
                        
                        let lastMessage = messages.first();
                        
                        if (lastMessage.author.bot) {

                            const filter = () => {
                                return true;
                            };
                            
                            lastMessage.awaitReactions(filter, {max: 1, time: 120000, errors: ['time'] })
                            .then(collected => {
                                let reaction = collected.first();
                                reac = reaction.emoji.name;

                                db.all(`SELECT * FROM role`, (err, rows) => {
                                    rows.forEach(element => {
                                        if(element.messageId == messageId && chan_id == element.channelId && reac == element.emoji) return message.channel.send(`L'emoji ${reac} a déja été associer a ce message`)
                                    })
                                    db.prepare(`INSERT INTO role(messageId, channelId, emoji, role, mode) VALUES(?, ?, ?, ?, ?)`, [messageId, chan_id, reac, roleId, mode], err => {
                                        if(err) {
                                            console.log(err);
                                        }
    
                                        const embed = new Discord.MessageEmbed()
                                        .setColor('#3C3C3A')
                                        .setTitle('ReactionRole Resumer')
                                        .addFields(
                                            [{name: 'Message', value: `${messageId}`},
                                            {name: 'Channel', value: `${arg[1]}`, inline:true},
                                            {name: 'Role', value: `${arg[3]}`, inline:true},
                                            {name: "Mode", value: `${mode}`, inline:true},
                                            {name: "Emoji", value: `${reac}`, inline:true}]
                                        )
                                        .setTimestamp()
                                
                                        message.channel.send(embed)
        
                                        msg.then(function (message) { message.react(reac) })
    
                                    }).run();
                                })
                            })
                            .catch(collected => {
                                message.channel.send('Bon, je ne sais pas ou vous etes passer (timeout)')
                            });
                        }
                    });
                }) 
                )
              }).catch(err => {
                console.error(err)
            })
        }

    }
}