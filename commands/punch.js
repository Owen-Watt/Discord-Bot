const Discord = require('discord.js');
const client = new Discord.Client();
module.exports.run = (message) =>{            
    let member = message.mentions.users.first();
    
    const noName = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setDescription(`**:x: Invalid**
                
    ?punch [@user]`)
    if(member){
        let target = message.guild.members.cache.get(member.id);
        
        const botPunch = new Discord.MessageEmbed()
        .setColor('#A00808')
        .setDescription(`:x: **You cannot punch the bot**

        ${target} was punched by ${message.author} :anger:`)

        const creatorPunch = new Discord.MessageEmbed()
        .setColor('#A00808')
        .setDescription(`:x: **You cannot punch him**

        ${message.author} was punched by ${target} :anger:`)

        const punch = new Discord.MessageEmbed()
        .setColor('#F9FAFA')
        .setDescription(`${target} was punched by ${message.author} :anger:`)

        const selfPunch = new Discord.MessageEmbed()
        .setColor('#A00808')
        .setDescription(`:x: **You cannot punch yourself**`)
        
        if(member === message.author){  // if they try to punch themselves
            message.channel.send(selfPunch);
        }else if(target == '225690566225166336'){  // if they try to punch me
            message.channel.send(creatorPunch);
        }else if(target == '795289659579957268'){ // if they try to punch the bot
            message.channel.send(botPunch);
        }else{
            message.channel.send(punch);
        }
    }else{
        message.channel.send(noName);
    }
}

module.exports.config = {
    name: "punch",
    aliases: []
}
