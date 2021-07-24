module.exports = {
    name: "user",
    isOwner: true,
    execute(message) {
        let find = 0;
        message.guild.fetchInvites().then(invites => {
            invites.forEach(invite => {
                for (let i = 0; i < message.author.presence.activities.length; i++) {
                    if(find) {
                        return;
                    }

                    if(message.author.presence.activities[i].type == "CUSTOM_STATUS" && message.author.presence.activities[i].state.includes(invite.code)) {
                        find = 1;
                        return message.channel.send('Trop bien BG tu as mis une invite de CoalStudio dans ton statue !');

                    } else if(message.author.presence.activities[i].type == "CUSTOM_STATUS" && message.author.presence.activities[i].state.toLowerCase() == "coalstudio") {
                        find = 1;
                        return message.channel.send('Trop bien BG tu as mis CoalStudio dans ton statue !')
                    }
                }
            });
        });
        // console.log(message.guild.fetchInvites('duVj3G5uru'));
    }
}