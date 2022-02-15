const Discord = require('discord.js');

module.exports.run = (message) =>{
        
    const modhelpEmbed = new Discord.MessageEmbed()
    .setColor('#2abab')
    .setTitle('Tokyo Bot Moderator Commands')
    .setDescription(`
    **Moderation**
    •  \`\`?kick  [user] [reason]\`\`  -  kicks a user
    •  \`\`?ban  [user] [reason]\`\`  -  bans a user
    •  \`\`?unban [user ID] [reason]\`\` - unbans a user
    •  \`\`?slowmode [time in seconds]\`\`  -  channel message slowmode
    •  \`\`?clear [number of messages to be deleted]\`\` - unbans a user
    `)

    message.channel.send(modhelpEmbed)
}

module.exports.config = {
    name: "modhelp",
    aliases: []
}