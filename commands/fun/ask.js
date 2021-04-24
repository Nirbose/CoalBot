const reply = [
    "Oui.",
    "Non.",
    "Je ne sais pas."
];

module.exports = {
    name: "ask",
    description: "Permet de donner une réponse aléatoire à une question.",
    execute(message) {

        const random = Math.floor(Math.random() * reply.length);

        message.reply(reply[random]);

    }
};