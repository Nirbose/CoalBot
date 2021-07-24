const fs = require('fs');
const Discord = require('discord.js') 
require('discord-reply');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database("./db/database.db")
const { MessageMenuOption, MessageMenu, MessageActionRow } = require('discord-buttons');

module.exports = {
    name: "reac",
    description: "Permet d'ajouter ou de supprimer un role avec des réactions'",
    categorie: "👑 - Admin",
    permition: "ADMINISTRATOR",
    execute(message, arg) {
        let roleId;
        let messageId;
        let chan_id;
        let mode = arg[0];
        let field = [];
        let menuId;
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
                        .setColor(process.color)
                        .setTitle('RecapList')
                        .addFields({name: 'Message : Channel', value: `${msgId} Dans <#${chanId}>`},field)
                        .setTimestamp()
                
                        message.channel.send(embed)
                        field = []
                    })
                }
            })
            console.log(mode == 'supprimer')
        } else if (mode == 'supprimer') { 
                try {
                    chan_id = arg[1].split(/[^0-9]/)[2];
                    if(message.guild.channels.cache.get(chan_id) === undefined) return message.channel.send("Ce channel n'existe pas !")
                    messageId = arg[2];
                    emoj = arg[3];
                    let tempem;
                    let tempmes;
                    console.log(messageId)
                    message.client.channels.cache.get(chan_id).messages.fetch(messageId).then(function (comp) {
                        component = comp.components
                        opt = component[0].components[0].options
                        for(i in opt) {
                            if(opt[i].value == emoj) opt.splice(i, 1)
                        }

                        let select = new MessageMenu()
                        .setID('customid')
                        .setPlaceholder('Click me! :D')
                        .setMinValues(0)
                        .setMaxValues(opt.length)
                        for (i in opt) {
                            let temp = new MessageMenuOption()
                            .setLabel(opt[i].label)
                            .setEmoji(opt[i].emoji.name)
                            .setValue(opt[i].value)
                            .setDescription(opt[i].description)
                            select.addOption(temp)
                        }

                        const row = new MessageActionRow()
                        row.addComponent(select)
                        comp.edit({components:[row]})

                    })
                    db.all(`SELECT * FROM role`, (err, rows) => {
                        rows.forEach(element => {
                            if(element.menuId == messageId && chan_id == element.channelId && emoj == element.emoji) tempem = true;
                            if(element.menuId == messageId && chan_id == element.channelId) tempmes = true
                        })
                        if(tempem != true) return message.channel.send(`L'emoji ${emoj} n'est pas associer a ce message`)
                        if(tempmes != true) return message.channel.send(`Ce message n'est pas un react role`)
                        db.run(`DELETE FROM role WHERE menuId=? AND emoji =?`, [messageId, emoj], function(err) {
                            if (err) {
                              return console.error(err.message);
                            }
                            return message.channel.send('React Role supprimer avec succes')
                          });
                    })
                    message.client.channels.cache.get(chan_id).messages.fetch({ limit: 50 }).then(messages => {
                        if(messages.has(messageId) == false) return message.channel.send('Ce message est introuvable')
                    });

                } catch {
                    return message.channel.send("Vous devez entrée la commande sous cette forme: `!reac *ajouter/retirer/supprimer* *channel* *id message* *role*`");
                }
        } else {
            try {
                if(mode != 'ajouter' && mode != 'retirer' && mode != 'supprimer') return message.channel.send("Vous devez entrée la commande sous cette forme: `!reac *ajouter/retirer/supprimer* *channel* *id message* *role*`");
            
                chan_id = arg[1].split(/[^0-9]/)[2];
                if(message.guild.channels.cache.get(chan_id) === undefined) return message.channel.send("Ce channel n'existe pas !")
                
                messageId = arg[2];
                
                roleId = arg[3].split(/[^0-9]/)[3];
            } catch {
                return message.channel.send("Vous devez entrée la commande sous cette forme: `!reac *ajouter/retirer/supprimer* *channel* *id message* *role*`");
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
                                let opti = [];
                                let count = 0;
                                db.all(`SELECT * FROM role`, (err, rows) => {
                                    rows.forEach(element => {
                                        if(element.messageId == messageId && chan_id == element.channelId && reac == element.emoji) return message.channel.send(`L'emoji ${reac} a déja été associer a ce message`)
                                        if(element.messageId == messageId && chan_id == element.channelId) {
                                            menuId = element.menuId;
                                            message.client.channels.cache.get(element.channelId).messages.fetch(element.menuId).then(function (comp) {
                                                count +=1
                                                opti.push({
                                                    'name':`option${count}`,
                                                    'label':message.guild.roles.cache.get(element.role).name,
                                                    'emoji':element.emoji,
                                                    'value':element.emoji,
                                                    'desc':`Cliquez pour ${element.mode} le role`
                                                }) 
                                            })
                                        }
                                    })
                                    const embed = new Discord.MessageEmbed()
                                    .setColor(process.color)
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
                                        
                                    let option = new MessageMenuOption()
                                    .setLabel(message.guild.roles.cache.get(roleId).name)
                                    .setEmoji(reac)
                                    .setValue(reac)
                                    .setDescription(`Cliquez pour ${mode} le role`)

                                    let valid = new MessageMenuOption()
                                    .setLabel("Valider")
                                    .setEmoji('✅')
                                    .setValue("Valider")
                                    .setDescription(`Cliquez pour valider votre choix`)

                                    let select = new MessageMenu()
                                        .setID('customid')
                                        .setPlaceholder('Click me! :D')
                                        .addOption(option)
                                        .addOption(valid)
                                        .setMinValues(0)
                                        .setMaxValues(2)

                                    const row = new MessageActionRow()
                                    
                                    msg.then(function (message) { 
                                        if(opti.length ==0) {
                                            message.lineReplyNoMention('Choissisez ici !').then(sentMessage => {
                                                db.prepare(`INSERT INTO role(messageId, channelId, emoji, role, mode, menuId) VALUES(?, ?, ?, ?, ?,?)`, [messageId, chan_id, reac, roleId, mode, sentMessage.id], err => {
                                                    if(err) {
                                                        console.log(err);
                                                    }
                                                }).run();
                                                row.addComponent(select)
                                                sentMessage.edit({components:[row]})
                                            })

                                        } else {
                                            for (i in opti) {
                                                let temp = new MessageMenuOption()
                                                .setLabel(opti[i].label)
                                                .setEmoji(opti[i].emoji)
                                                .setValue(opti[i].value)
                                                .setDescription(opti[i].desc)
                                                select.addOption(temp)
                                            }
                                            select.setMaxValues(opti.length+2)
                                            row.addComponent(select)

                                            message.client.channels.cache.get(chan_id).messages.fetch(menuId).then(function (comp) {
                                                comp.edit({components:[row]})
                                                db.prepare(`INSERT INTO role(messageId, channelId, emoji, role, mode, menuId) VALUES(?, ?, ?, ?, ?,?)`, [messageId, chan_id, reac, roleId, mode, comp.id], err => {
                                                    if(err) {
                                                        console.log(err);
                                                    }
                                                }).run();
                                            })
                                        }
                                    })
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