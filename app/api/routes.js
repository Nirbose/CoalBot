const express = require('express')
const app = express()
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/database.db')

const config = require('../../config.json')

module.exports = () => {

    const authorized = (headers) => {
        if(headers.authorization != config.API_KEY) {
            return false;
        } else {
            return true;
        }
    }

    // Message Route
    app.get('/messages', (req, res) => {
        if(authorized(req.headers)) {
            db.all(`SELECT * FROM messages`, (err, rows) => {
                if(err) {
                    return res.status(500).json({
                        status: 500,
                        message: "500: Server error"
                    })
                }

                res.status(200).json({

                    status: 200,
                    data: rows,
                    count: rows.length
    
                })
            })
        } else {
            res.status(401).json({

                status: 401, 
                message: "401: Unauthorized"

            })
        }
    })

    // Warn Route
    app.get('/warn', (req, res) => {
        if(authorized(req.headers)) {
            db.all(`SELECT * FROM warn`, (err, rows) => {
                if(err) {
                    return res.status(500).json({
                        status: 500,
                        message: "500: Server error"
                    })
                }

                res.status(200).json({

                    status: 200,
                    data: rows,
                    count: rows.length
    
                })
            })
        } else {
            res.status(401).json({

                status: 401, 
                message: "401: Unauthorized"

            })
        }
    })

    // Stats Route
    app.get('/stats', (req, res) => {
        if(authorized(req.headers)) {
            db.all(`SELECT * FROM stats`, (err, rows) => {
                if(err) {
                    return res.status(500).json({
                        status: 500,
                        message: "500: Server error"
                    })
                }

                res.status(200).json({

                    status: 200,
                    data: rows,
                    count: rows.length
    
                })
            })
        } else {
            res.status(401).json({

                status: 401, 
                message: "401: Unauthorized"

            })
        }
    })

    // Role Route
    app.get('/role', (req, res) => {
        if(authorized(req.headers)) {
            db.all(`SELECT * FROM role`, (err, rows) => {
                if(err) {
                    return res.status(500).json({
                        status: 500,
                        message: "500: Server error"
                    })
                }

                res.status(200).json({

                    status: 200,
                    data: rows,
                    count: rows.length
    
                })
            })
        } else {
            res.status(401).json({

                status: 401, 
                message: "401: Unauthorized"

            })
        }
    })

    // Channels Route
    app.get('/channels', (req, res) => {
        if(authorized(req.headers)) {
            db.all(`SELECT * FROM channels`, (err, rows) => {
                if(err) {
                    return res.status(500).json({
                        status: 500,
                        message: "500: Server error"
                    })
                }

                res.status(200).json({

                    status: 200,
                    data: rows,
                    count: rows.length
    
                })
            })
        } else {
            res.status(401).json({

                status: 401, 
                message: "401: Unauthorized"

            })
        }
    })

    app.listen(8080, () => {
        console.log("Serveur à l'écoute")
    })
}