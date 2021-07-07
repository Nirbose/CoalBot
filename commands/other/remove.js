const { MessageMenuOption, MessageMenu, MessageActionRow } = require('discord-buttons');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database("./db/database.db");

module.exports = {
    name: "remove",
    description: "Permet d'enlever un role.",
    categorie: "Other",
    execute(message) {
        let roles = message.member.roles.cache;
        const select = new MessageMenu();
        const buttonRow = new MessageActionRow();

        roles.forEach(element => {
            if(element.name != '@everyone') {
                let temp = new MessageMenuOption()
                .setLabel(element.name)
                .setDescription('test')
                .setValue(element.id)

                select.addOption(temp)
            }
        });

        select.setMaxValues(roles.length).setID('menu').setPlaceholder('Remove ton role ;)').setMinValues(0);
        buttonRow.addComponent(select);

        message.channel.send('test', buttonRow)

    }
}