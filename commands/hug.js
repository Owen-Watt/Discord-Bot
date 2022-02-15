const Discord = require('discord.js');
const client = new Discord.Client();
module.exports.run = (message) =>{  
    let member = message.mentions.users.first();

    const noName = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setDescription(`**:x: Invalid**
            
    ?hug [@user]`)   

    if(member){
        const memberTarger = message.guild.members.cache.get(member.id);
        const hugEmbed = new Discord.MessageEmbed()
        .setColor('#F9FAFA')
        .setDescription(`${memberTarger} was hugged by ${message.author} :heart:`)

        message.channel.send(hugEmbed);
    }else{
        message.channel.send(noName);
    }
}


module.exports.config = {
    name: "hug",
    aliases: []
}
