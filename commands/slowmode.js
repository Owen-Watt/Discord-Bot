const Discord = require('discord.js');
module.exports.run = (client, message) =>{
    const perms = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setDescription(`**:x: Invalid permissions!**
                
    • Permissions needed: Manage Channels`)

    if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(perms)

    if (message.member.hasPermission('BAN_MEMBERS')) {
        let messageArray = message.content.split(' ');
        let args = messageArray.slice(1);

        const invalidSlowMode = new Discord.MessageEmbed()
        .setColor('#000000')
        .setDescription(`**:x: Invalid**
        
        You must specify how long: "?slowmode <seconds>" `)

        const tooHigh = new Discord.MessageEmbed()
        .setColor('#000000')
        .setDescription(`**:x: Invalid**
        
        The value must be below 21600.`)

        const tooLow = new Discord.MessageEmbed()
        .setColor('#000000')
        .setDescription(`**:x: Invalid**

        The value must be greater than 0`)

        const noNumber = new Discord.MessageEmbed()
        .setColor('#000000')
        .setDescription(`**:x: Invalid**
        
        The value is not a number.`)

        const slowEmbed = new Discord.MessageEmbed()
        .setColor('#2abab')
        .setDescription(`Slowmode is now: ${args[0]}s :white_check_mark: `)

        if (!args[0]){                                  // if there is an input
            return message.channel.send(invalidSlowMode);
        }else if(isNaN(args[0])){                       // checks if its a number
            return message.channel.send(noNumber);      
        }else if(args[0]>21600){                        // if above max
            return message.channel.send(tooHigh)    
        }else if(args[0]<0){                            // if below 0 
            return message.channel.send(tooLow)    
        }else{
            try{
                message.channel.setRateLimitPerUser(args[0])
            }catch(err){
                return message.channel.send(`:x: An Error Occured:  ${err}`);
            }
            
            message.channel.send(slowEmbed);
        }
    }else{
        message.channel.send('You do not have permissions to use this command.')
    }   
}

module.exports.config = {
    name: "slowmode",
    aliases: []
}
