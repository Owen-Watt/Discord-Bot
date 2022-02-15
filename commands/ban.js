const Discord = require('discord.js');
module.exports.run = (message, args) =>{
    let { mentions } = message

    const noName = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setDescription(`**:x: Invalid**
            
    ?ban [@user] [reason]`)

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permissions to use this command.") 
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I need permissions to do that!") 

    let target = mentions.users.first()
    if(target) {
        const targetMember = message.guild.members.cache.get(target.id)
        let reason = args.slice(1).join(" ");
        if (!reason){
            reason = "No reason provided";
        } 
        try{
            targetMember.ban();
        }catch(err){
            return message.channel.send(`:x: An Error Occured:  ${err}`)
        } 

        const banEmbedLog = new Discord.MessageEmbed()
        .setColor('#A00808')
        .setTitle('BANNED')
        .setDescription(`${targetMember} has been banned from the server!
        Reason: ${reason}
        Moderator: ${message.author.username}`)
        .setTimestamp()

        message.channel.send(banEmbedLog)
    }else{
        message.channel.send(noName)
    }
}

module.exports.config = {
    name: "ban",
    aliases: []
}