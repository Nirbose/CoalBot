module.exports = {
    name: "botinfo",
    description: "Permet d'avoir les informations sur le bot",
    categorie: "Information",
    execute(message) {
        message.channel.send("BotInfo")
    }
}