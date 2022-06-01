const { MessageEmbed } = require("discord.js")
// when a user leaves a server the bot is in
module.exports = {
	name: 'guildMemberRemove',
	async execute(guildMember) {
        let {guild} = guildMember;
            
        if(guild.id ==='723482268886368307'){
            const leavingEmbed = new MessageEmbed()
            .setTitle(`**${guildMember.user.tag}**`)
            .setDescription(`**:x: Member left**\n${guildMember}`) 
            .setColor('#A00808')

            guildMember.guild.channels.cache.get('797152411906342953').send({
                embeds: [ leavingEmbed ]
            });
            
            memberCounter(guildMember.guild);
        }

        const memberCounter = guild => {
            const channel = client.channels.cache.get('796117119712100373');
            channel.setName(`• ${guild.memberCount.toLocaleString()}`)
        }
	},
};