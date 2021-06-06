module.exports = {
    name: "eval", 
    description: "Commande pour evaluer un code.",
    categorie: "Other",
    execute(message, args) {
        const clean = text => {
            if (typeof(text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
            }

        try {
            const code = args.join(" ").replace(/`/g, '').replace('js', '');
            let evaled = eval(code);
            
       
            if (!typeof evaled == "string")
              evaled = require("util").inspect(evaled);
       
            message.channel.send(clean(evaled), {code:"xl"});
        } catch (err) {
            console.log(err)
            message.channel.send(err)
        }
    }
}