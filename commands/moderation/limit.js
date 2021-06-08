module.exports = {
    name: "limit",
    description: "Permet de limiter un salon vocal en nombre.",
    categorie: "Moderation",
    execute(message, arg) {

        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Vous n'avez pas la permition `MANAGE_CHANNELS`.");
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Je n'ais pas la permition `MANAGE_CHANNELS`.");

        if(!message.member.voice.channel) return message.channel.send('Vous devez être connectez dans un vocal pour effectuer cette commande.');

        if(!arg[0]) return message.channel.send("Il me faut un nombre...");
        if(isNaN(arg[0])) return message.channel.send("Il me faut un nombre...");
        if(arg[0] > 99) return message.channel.send("Vous ne pouvez pas mettre plus de 99 personnes comme limite !")
        if(arg[0] < 0) return message.channel.send("Vous ne pouvez pas mettre moins de 0 personne comme limite !")

        message.member.voice.channel.setUserLimit(arg[0]);
    }
}