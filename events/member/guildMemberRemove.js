const fs = require('fs');

module.exports = async (client, member) => {
    /**   Stats partie   **/

    let d = new Date();
    let d_year = d.getFullYear();
    let d_mouth = d.getMonth() + 1;

    let rawdata = fs.readFileSync('./json/stats.json');
    let json_stats = JSON.parse(rawdata);

    for(let i = 0; i < json_stats.length; i++) {
        if(json_stats[i].year == d_year && json_stats[i].month == d_mouth) {
            json_stats[i].members.leave++;

            let push = JSON.stringify(json_stats, null, 2);
            fs.writeFile('./json/stats.json', push, (err) => {
                if (err) throw err;
                console.log('On ne peux pas écrir');
            });
            return;
        }
    }

    json_stats.push({"year": d_year, "month": d_mouth, "members": {"join": 0, "leave": 1}})
    let push = JSON.stringify(json_stats, null, 2);
    fs.writeFile('./json/stats.json', push, (err) => {
        if (err) throw err;
        console.log('On ne peux pas écrir');
    });

    /**   End Stats partie   **/
}