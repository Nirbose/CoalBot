const sqlite3 = require('sqlite3');
let db = new sqlite3.Database("./db/database.db")

module.exports = client => {

    // DataBase
    db.prepare(`CREATE TABLE IF NOT EXISTS warn (id INTEGER, userId VACHAR(255), nb_warn INT, reason TEXT, PRIMARY KEY (id))`).run().finalize()
    
    db.close();

    client.user.setPresence({activity: {name: "CoalStudio.fr"}});
    console.log(
        `Le bot est ON !`
    );
}