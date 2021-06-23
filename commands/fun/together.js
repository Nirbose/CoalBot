const { DiscordTogether } = require('discord-together');

module.exports = {
    name: "together",
    description: "Permet de jouer/regarder quelque chose ensemble.",
    categorie: "Fun",
    execute(message, arg) {

        if(!message.member.voice.channel) return message.channel.send('Il faut se trouver dans un channel vocal !');
        
        let msg = arg[0].toLowerCase();
        let listing = ["youtube", "chess", "poker", "betrayal", "fishing"];
        message.client.discordTogether = new DiscordTogether(message.client);

        if(listing.includes(msg)) {

            message.client.discordTogether.createTogetherCode(message.member.voice.channelID, msg).then(async invite => {
                return message.channel.send(`${invite.code}`);
            });

        } else {
            return message.channel.send("L'argument n'est pas dans ma liste, Voila ma liste : `youtube`, `chess`, `poker`, `betrayal`, `fishing`")
        }

    }
}