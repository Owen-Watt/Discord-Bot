const Discord = require('discord.js');
module.exports.run = async (client, message) =>{

    let messageArray = message.content.split(" ")
    let args = messageArray.slice(1);
    let toUnban = await client.users.fetch(args[0])

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permissions to use this command.") 
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I need permissions!") 

    let reason = args.slice(1).join(" ") || "No reason provided";
    
    try{
        message.guild.members.unban(toUnban, reason);
    }catch(err){
        return message.channel.send(`:x: An Error Occured:  ${err}`);
    }

    const unbanEmbedLog = new Discord.MessageEmbed()
    .setColor('#008000')
    .setTitle('UNBANNED')
    .setDescription(`${toBan} has been unbanned from the server!
    Reason: ${reason}
    Moderator: ${message.author.username}`)
    .setTimestamp()
    
    message.channel.send(unbanEmbedLog)
}

module.exports.config = {
    name: "unban",
    aliases: []
}
    
