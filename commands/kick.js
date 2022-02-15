const Discord = require('discord.js');
module.exports.run = (message, args) =>{
    let { mentions } = message
    let noName = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setDescription(`**:x: Invalid**
    
    ?kick [@user] [reason]`)

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permissions to use this command.") 
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I need permissions to do that!") 

    const target = mentions.users.first()

    if(target) {
        let targetMember = message.guild.members.cache.get(target.id)
        let reason = args.slice(1).join(" ");
        
        if (!reason){
            reason = "No reason provided";
        } 

        try{
            targetMember.kick();
        }catch(err){
            return message.channel.send(`:x: An Error Occured:  ${err}`)
        }  

        const kickEmbedLog = new Discord.MessageEmbed()
        .setColor('#A00808')
        .setTitle('KICKED')
        .setDescription(`${message.author.username} has kicked ${targetMember}
        Reason: ${reason}`)
        .setTimestamp()

        message.channel.send(kickEmbedLog)
    }else{
        message.channel.send(noName) 
    }
}

module.exports.config = {
    name: "kick",
    aliases: []
}


