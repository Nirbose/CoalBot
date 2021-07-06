const fs = require('fs');
const Discord = require('discord.js');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database("./db/database.db");

module.exports = async (client, menu) => {
    
    if(menu.clicker.user.bot) return;
    let emoj = [];
    let rol = [];
    let type = [];
    const member = menu.message.guild.members.cache.get(menu.clicker.user.id);
    db.all(`SELECT * FROM role`, (err, rows) => {
        rows.forEach(element => {
            if(menu.message.id == element.menuId && menu.channel.id == element.channelId) {
                if(menu.values.includes(element.emoji)) {
                    emoj.push(element.emoji)
                    rol.push(menu.message.guild.roles.cache.get(element.role)) 
                    type.push(element.mode)
                }       
            }
        });
        
        for (i in menu.values) {
            //revoir le sys pour retirer quand tu remove
            if(menu.values.includes(emoj[i])) {
                if(type[i] == 'retirer') {
                    if(member.roles.cache.has(rol[i].id)) {
                        member.roles.remove(rol[i])
                    }
                    member.roles.remove(rol[i])
                    menu.reply.defer()
                } else {
                    if(member.roles.cache.has(rol[i].id)) {
                        member.roles.remove(rol[i])
                    } else {
                        member.roles.add(rol[i])
                    }
                    menu.reply.defer()
                    
                }
            }
            
        }

    });

}