module.exports = {
    name: "mute",
    description: "Permet de donner le role mute a une personne.",
    categorie: "Moderation",
    execute(message, arg) {

        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Vous n'avez pas la permition `MANAGE_ROLES`.");
        if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("Je n'ais pas la permition `MANAGE_ROLES`.");

        if(!arg[0]) return message.channel.send("Il me faut l'ID d'un utilisateur.");
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!member) return message.channel.send("L'utilisateur n'a pas été trouver.")
        if(member.id === message.author.id) return message.channel.send("Vous ne pouvez pas vous auto mute.");

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Pas de raison';

        let role = message.guild.roles.find(role => role.name.toLowerCase() === "mute");
        message.member.addRole(role);
        message.channel.send(`${member} a bien été mute pour la raison ${reason}`)

    }
}