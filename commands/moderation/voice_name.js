module.exports = {
    name: "voice_name",
    description: "Permet de renomer son salon vocal personnel.",
    categorie: "Moderation",
    execute(message, args) {

        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Vous n'avez pas la permition `MANAGE_CHANNELS`.");
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Je n'ais pas la permition `MANAGE_CHANNELS`.");

        if(!message.member.voice.channel) message.channel.send('Vous devez être connectez dans un vocal pour effectuer cette commande.');

        let name = args.slice(0).join(" ");
        if(!name) return message.channel.send("Il me faut un nom.");

        if(message.client.voiceCreate.includes(message.member.voice.channel.id)) {
            message.member.voice.channel.setName(name);
            message.channel.send("Voila ! Votre channel a été changer en : " + name)
        } else {
            return message.channel.send('Vous ne pouvez pas changer le nom de se salon.');
        }

    }
}