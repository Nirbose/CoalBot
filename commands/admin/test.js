const { MessageMenuOption, MessageMenu } = require('discord-buttons');

module.exports = {
    name: 'test',
    execute(message) {

        let option = new MessageMenuOption()
        .setLabel('Your Label')
        .setEmoji('🍔')
        .setValue('menuid')
        .setDescription('Custom Description!')
        
        let select = new MessageMenu()
            .setID('customid')
            .setPlaceholder('Click me! :D')
            .setMaxValues(1)
            .setMinValues(1)
            .addOption(option)
        
        message.channel.send('Text with menu!', select);
    
    }
}