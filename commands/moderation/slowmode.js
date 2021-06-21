module.exports = {
    name: "slowmode",
    description: "Permet de mettre un slowmode au salon voulue.",
    aliases: ['slow'],
    categorie: "Moderation", 
    execute(message, args) {

        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Vous n'avez pas la permition `MANAGE_CHANNELS`.");
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Je n'ais pas la permition `MANAGE_CHANNELS`.");

        if(!args[0]) return message.channel.send('Il me faut un temps en seconde !');
        if(isNaN(args[0])) return message.channel.send('Il faut que cela soit un nombre !');

        try {
            message.channel.setRateLimitPerUser(args[0]);
            message.channel.send('Voila le slowmode est activer à ' + args[0]);
        } catch(err) {
            message.channel.send('une erreur c\'est produite...');
        }
    }
}