const fs = require('fs');
const Discord = require('discord.js')

module.exports = {
    name: "reac",
    description: "Permet d'ajouter ou de supprimer un role avec des réactions'",
    categorie: "Admin",
    execute(message, arg) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous n'êtes pas Admin.");
        
        let reac;
        let roleId;
        let messageId;
        let chan_id;
        let mode = arg[0];
        let rawdata = fs.readFileSync("./json/reactionRole.json");
        let data = JSON.parse(rawdata);
        let field = [];
        if(mode == 'list') {
            var names=[...new Set(data.message.map(a=>a.messageId))];
            names.forEach(function(item){
              indexes=data.message.map(function(item,i){
                 item["index"]=i;
                 return item;
              })
              .filter(a=>a.messageId==item)
              .map(a=>a.index);

              for(let i = 0; i < indexes.length; i++) {
                field.push({name: 'Emoji : Role : Mode', value: `L'emojie ${data.message[indexes[i]].emoji} ${data.message[indexes[i]].mode} le role <@&${data.message[indexes[i]].role}>`})
              }

              const embed = new Discord.MessageEmbed()
              .setColor('#3C3C3A')
              .setTitle('RecapList')
              .addFields({name: 'Message : Channel', value: `${data.message[indexes[0]].messageId} Dans <#${data.message[indexes[0]].channelId}>`},field)
              .setTimestamp()
      
              message.channel.send(embed)
            });

        } else {

            try {
                if(mode != 'ajouter' && mode != 'retirer') return message.channel.send("Vous devez entrée la commande sous cette forme: `!reactionRole *ajouter/retirer* *channel* *id message* *role*`");
            
                chan_id = arg[1].split(/[^0-9]/)[2];
                if(message.guild.channels.cache.get(chan_id) === undefined) return message.channel.send("Ce channel n'existe pas !")
                
                messageId = arg[2];
                
                roleId = arg[3].split(/[^0-9]/)[3];
            } catch {
                return message.channel.send("Vous devez entrée la commande sous cette forme: `!reactionRole *ajouter/retirer* *channel* *id message* *role*`");
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
                                for (let index = 0; index < data.message.length; index++) {
                                    if(messageId == data.message[index].messageId && chan_id == data.message[index].channelId && reac == data.message[index].emoji) return message.channel.send(`L'emoji ${reac} a déja été associer a ce message`)
                                }
                                let dat =  {
                                    messageId: messageId,
                                    channelId: chan_id,
                                    emoji: reac,
                                    role:roleId,
                                    mode:mode
                                }

                                data.message.push(dat);
                                let push = JSON.stringify(data, null, 2);

                                fs.writeFile('./json/reactionRole.json', push, (err) => {
                                    if (err) throw err;
                                });

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