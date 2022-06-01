const { MessageEmbed } = require("discord.js")
// when a user joins a server the bot is in
module.exports = {
	name: 'guildMemberAdd',
	async execute(guildMember) {
        let {guild} = guildMember;
            
        if(guild.id === '723482268886368307'){
            const requirementsID = '764080032079020032'
            const verifyID = '761611143503675452'
            const verifyChannel = guildMember.guild.channels.cache.get(verifyID);
            const requirementsChannel = guildMember.guild.channels.cache.get(requirementsID);

            const welcomeEmbed = new MessageEmbed()
            .setColor('#FFB6C1')
            .setTitle(`**${guild}**`)
            .setDescription(`Welcome <@${guildMember.user.id}>\n\n•  Verify in ${verifyChannel.toString()}\n•  ${requirementsChannel.toString()}`)
            
            .setImage('https://media.giphy.com/media/GEkAU4EckSumA/giphy.gif')
            .setThumbnail(guildMember.user.displayAvatarURL({dynamic: true}))
            
            let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Un-Verified')
                
            guildMember.roles.add(welcomeRole);
            guildMember.guild.channels.cache.get('723485611478220842').send({
                embeds: [ welcomeEmbed ]
            });

            memberCounter(guildMember.guild);
        }

        if(guild.id === '968516326681374743'){
            let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'User')
                
            guildMember.roles.add(welcomeRole);
        }

        const memberCounter = guild => {
            const channel = client.channels.cache.get('796117119712100373');
            channel.setName(`• ${guild.memberCount.toLocaleString()}`)
        }
	},
};