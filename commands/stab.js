const Discord = require('discord.js');
const client = new Discord.Client();
module.exports.run = (client, message, args) =>{             
    let member = message.mentions.users.first();
    let target = message.guild.members.cache.get(member.id)

    const noName = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setDescription(`**:x: Invalid**
            
    ?stab [@user]`)

    const stab = new Discord.MessageEmbed()
    .setColor('#F9FAFA')
    .setDescription(`${target} was stabbed by ${message.author} :knife:`)

    const botStab = new Discord.MessageEmbed()
    .setColor('#A00808')
    .setDescription(`:x: **You cannot stab the bot**

    ${message.author} was stabbed by ${target} :knife:`)

    const creatorStab = new Discord.MessageEmbed() 
    .setColor('#A00808')
    .setDescription(`:x: **You cannot stab him**

    ${message.author} was stabbed by ${target} :knife:`)

    const selfStab = new Discord.MessageEmbed()
    .setColor('#A00808')
    .setDescription(`:x: **You cannot stab yourself**`)

    
    if(member){
        if(member === message.author){  // if they try to stab themselves
            message.channel.send(selfStab)
        }else if(target == '225690566225166336'){ // if they try to stab me
            message.channel.send(creatorStab);
        }else if(target == '795289659579957268'){  // if they try to stab the bot
            message.channel.send(botStab);
        }else{
            message.channel.send(stab);
        }
    }else{
        message.channel.send(noName);
    }
}

module.exports.config = {
    name: "stab",
    aliases: []
}
