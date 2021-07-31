const express = require('express')
const app = express()

const router = require('./routes');

// const URL = "https://discord.com/api"

// app.get('/guilds', (req,res) => {
//     fetch(URL + '/guilds/844641672662351933', {
//         headers: {
//             'Authorization': 'Bot ' + config.token
//         }
//     })
//     .then((response) => response.json())
//     .then(data => {
//         res.status(200).json(data)
//     })
// })

router();