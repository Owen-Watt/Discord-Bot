const Discord = require('discord.js');

module.exports.run = (message) =>{
    const helpEmbed = new Discord.MessageEmbed()
    .setColor('#2abab')
    .setTitle('Tokyo Bot Commands')
    .setDescription(`
    **Commands**
    • \`\`dab\`\` - makes the bot dab.
    • \`\`gay\`\` - the bot tells you how gay you are.
    • \`\`?hug [user]\`\` - hugs the user you mention.
    • \`\`?punch [user]\`\` - punches the user you mention.
    • \`\`?stab [user]\`\` - stabs the user you mention.
    • \`\`?scrambler\`\` - See who can type the fastest.
    • \`\`?invite\`\` - add the Tokyo Bot to your server
    • \`\`?support\`\` - for help with the bot

    • Use ?modhelp for Moderator commands.
    `);

    message.channel.send(helpEmbed)
}

module.exports.config = {
    name: "help",
    aliases: []
}
