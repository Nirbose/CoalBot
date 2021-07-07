const fs = require('fs');
const Discord = require('discord.js');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database("./db/database.db");

module.exports = async (client, menu) => {
    
    if(menu.clicker.user.bot) return;
    let emoj = [];
    let rol = [];
    let type = [];
    let allRole = [];
    const member = menu.message.guild.members.cache.get(menu.clicker.user.id);
    db.all(`SELECT * FROM role`, (err, rows) => {
        rows.forEach(element => {
            if(menu.message.id == element.menuId && menu.channel.id == element.channelId) {
                allRole.push(menu.message.guild.roles.cache.get(element.role)) 
                if(menu.values.includes(element.emoji)) {
                    emoj.push(element.emoji)
                    rol.push(menu.message.guild.roles.cache.get(element.role)) 
                    type.push(element.mode)
                }       
            }
        });
        
        for (i in menu.values) {
            if(rol.length>i) {
                let removeIndex = allRole.map(function(item) { return item.id; }).indexOf(rol[i].id);
                allRole.splice(removeIndex, 1)
            }
            for (i in allRole) {
                member.roles.remove(allRole[i])
            }
            if(menu.values.includes(emoj[i]) && menu.values.includes('Valider')) {
                if(type[i] == 'retirer') {
                    member.roles.remove(rol[i])
                } else {
                    member.roles.add(rol[i])
                }
            }
        }
        if(menu.values.includes('Valider')) menu.reply.defer()
        
    });

}