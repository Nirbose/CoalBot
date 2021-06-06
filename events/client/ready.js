const sqlite3 = require('sqlite3');
let db = new sqlite3.Database("./db/database.db")

module.exports = client => {

    // DataBase
    db.prepare(`CREATE TABLE IF NOT EXISTS warn (id INTEGER, userId VACHAR(255), nb_warn INT, reason TEXT, PRIMARY KEY (id))`).run().finalize()
    db.prepare(`CREATE TABLE IF NOT EXISTS role (id INTEGER, messageId VACHAR(255), channelId VACHAR(255), emoji VACHAR(255), role VACHAR(255), mode TEXT, PRIMARY KEY (id))`).run().finalize()
    db.prepare(`CREATE TABLE IF NOT EXISTS wordBanned (id INTEGER, word VACHAR(255), userId VACHAR(255), PRIMARY KEY (id))`).run().finalize()
    db.prepare(`CREATE TABLE IF NOT EXISTS bump (id INTEGER, userId VACHAR(255), PRIMARY KEY (id))`).run().finalize()

    db.close();

    client.user.setPresence({activity: {name: "CoalStudio.fr"}});
    console.log(
        `Le bot est ON !`
    );
}