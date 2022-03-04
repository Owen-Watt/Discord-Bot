const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban someone')
        .addMentionableOption(bannedUser =>
            bannedUser.setName('user')
                .setDescription('The user to ban')
                .setRequired(true))
        .addStringOption(reason =>
            reason.setName('reason')
                .setDescription('Reason to ban someone')
                .setRequired(false)),

	async execute(interaction) {
        let target = interaction.options.getMentionable('user');
        let reason = interaction.options.getString('reason');

        if(!reason){
            reason = "No Reason provided";
        } 

        const banEmbedLog = new Discord.MessageEmbed()
        .setColor('#A00808')
        .setTitle('BANNED')
        .setDescription(`${target} has been banned from the server!
        Reason: ${reason}
        Moderator: ${interaction.member}`)
        .setTimestamp()

        if(interaction.member.permissions.has([Permissions.FLAGS.BAN_MEMBERS])){
            target.ban().then(() =>{
                interaction.reply({ 
                    embeds: [ banEmbedLog ],
                });
            }, error =>{
                interaction.reply({ 
                    content: `:x: ${error}`,
                });
            });

        }else{
            interaction.reply({ 
                content: `:x: You do not have Permissions`,
            });
        } 
	},
};
