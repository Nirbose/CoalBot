const { readdirSync } = require("fs");
const functions = require('./loader')

const loadCommands = functions.loadCommands = (client, dir = "./commands/") => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
    
        for (const file of commands) {
            const getFileName = require(`../${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.name, getFileName);
            console.log(`Commande chargée : ${getFileName.name}`);
        };
    });
};

const loadEvents = functions.loadEvents = (client, dir = "./events/") => {
    readdirSync(dir).forEach(dirs => {
        const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));
 
        for (const event of events) {
            const evt = require(`../${dir}/${dirs}/${event}`);
            const evtName = event.split(".")[0];
            client.on(evtName, evt.bind(null, client));
            console.log(`Evènement chargé : ${evtName}`);
        };
    });
};

module.exports = {
    loadCommands,
    loadEvents,
}