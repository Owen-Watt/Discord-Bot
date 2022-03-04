const { MessageEmbed } = require('discord.js');

module.exports = (client) => {
    client.handleListeners = async () =>{
        client.on('guildMemberAdd',guildMember=> {     
            let {guild} = guildMember;
            
            if(guild.id === '723482268886368307'){
                const requirementsID = '764080032079020032'
                const verifyID = '761611143503675452'

                const welcomeEmbed = new MessageEmbed()
                .setColor('#FFB6C1')
                .setTitle(`**${guild}**`)
                .setDescription(`Welcome <@${guildMember.user.id}> 
                
                •  verify in ${guildMember.guild.channels.cache.get(verifyID).toString()}
                •  ${guildMember.guild.channels.cache.get(requirementsID).toString()}`)
                .setImage('https://media.giphy.com/media/GEkAU4EckSumA/giphy.gif')
                .setThumbnail(guildMember.user.displayAvatarURL({dynamic: true}))
                .setTimestamp()
                
                let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Un-Verified')
                    
                guildMember.roles.add(welcomeRole);
                guildMember.guild.channels.cache.get('723485611478220842').send({
                    embeds: [ welcomeEmbed ]
                });
            }
        })

        client.on('guildMemberRemove',guildMember=> {     
            let {guild} = guildMember;
            
            if(guild.id ==='723482268886368307'){
                const leavingEmbed = new MessageEmbed()
                .setTitle(`**${guildMember.user.tag}**`)
                .setDescription(`**:x: Member left**
                ${guildMember}`) 
                .setTimestamp()
                .setColor('#A00808')

                guildMember.guild.channels.cache.get('797152411906342953').send({
                    embeds: [ leavingEmbed ]
                });
            }
        });

        client.on('messageCreate', message=>{
            if(message.content.toLowerCase().trim() ==='tokyo help') {
                const helpEmbed = new MessageEmbed()
                .setColor("BLURPLE")
                .setTitle('**Commands**')
                .setDescription(`
                • \`\`dab\`\` - makes the bot dab.
                • \`\`/hug [user]\`\` - hugs the user you mention.
                • \`\`/punch [user]\`\` - punches the user you mention.
                • \`\`/stab [user]\`\` - stabs the user you mention.`);

                message.channel.send({ 
                    embeds: [ helpEmbed ]  
                });
            }
        })
    }
}