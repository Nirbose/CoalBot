const fetch = require('node-fetch');

module.exports = {
    name: "joke",
    description: "Commande pour sortir une blague.",
    categorie: "Fun",
    execute(message) {
        fetch('https://www.blagues-api.fr/api/random', {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzgwODE0OTUxMjI4MjQ0MDE4IiwibGltaXQiOjEwMCwia2V5IjoidzVkSEVUTnJsVW1nQnUxeVhENmREMWFDVGE2WjhPNHg1Z1hGRHhTMURMUk1Jbk90MEsiLCJjcmVhdGVkX2F0IjoiMjAyMS0wNS0xM1QxMTozNToxMiswMDowMCIsImlhdCI6MTYyMDkwNTcxMn0.ATaQVzknAdLbI2N2_JqN7XAW6Qe7sqX_tUf0dJOKxWA`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            message.channel.send(`${data.joke} \n||${data.answer}||`)
        });
    }
}