const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

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

        const banEmbedLog = new MessageEmbed()
        .setColor('#A00808')
        .setTitle('BANNED')
        .setDescription(`${target} has been banned from the server!`)
        .addFields(
            { name: '**Reason:**', value: `${reason}`, inline: true },
            { name: '**Moderator:**', value:`${interaction.member}`, inline: true },
        )
        .setTimestamp()

        if(interaction.member.permissions.has([Permissions.FLAGS.BAN_MEMBERS])){
            target.ban().then(async () =>{
                await interaction.reply({ 
                    embeds: [ banEmbedLog ],
                });
            }, async (error) =>{
                await interaction.reply({ 
                    content: `:x: ${error}`,
                    ephemeral: true,
                });
            });
        }else{
            const userNoPermissions = new MessageEmbed()
            .setColor('#A00808')
            .setTitle('Ban Command')
            .setDescription(`:x: You do not have Permissions to use this command.`)
            .setTimestamp()

            await interaction.reply({ 
                embeds: [ userNoPermissions ],
                ephemeral: true,
            });
        } 
	},
};
