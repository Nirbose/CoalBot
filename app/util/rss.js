const request = new (require("rss-parser"))();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database("./db/database.db")

class Rss {

    constructor(client,
        timeout= 30000, 
        rssURL= {
            'youtube': ['https://www.youtube.com/feeds/videos.xml?channel_id=UCRyHxeEzuWhnE0NuGxEdNzg'],
            'twitter': [''],
            'twitch' : ['']
        }
    ) {
        this.client = client;
        this.timeout = timeout;
        this.rssURL = rssURL
    }


    async flux(name) {
        if(!this.rssURL[name]) return new Error('Unexiste rss flux ' + name);

        this.rssURL[name].forEach(url => {
            request.parseURL(url)
            .then(data => {
                setInterval(() => {
                    console.log(url)
                }, this.timeout);
            });
        })
    }

    // async youtube() {
    //     request.parseURL(this.rssURL.youtube)
    //     .then(data => {
    //         setInterval(() => {
    //             console.log(data)
    //             console.log('------------------------')
    //             this.send();
    //         }, this.timeout);
    //     })
    // }

    send(rssName = null) {
        db.all(`SELECT * FROM channels`, function(err, rows) {
            if(err) return console.error(err);

            rows.forEach(channel => {
                if(channel.name === 'rss') {
                    this.client.channels.cache.get(channel.channelId).send('okey !')
                }
            })
        })
    }
}

module.exports = Rss;