const { EmbedBuilder,SlashCommandBuilder, PermissionsBitField  } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('settings')
		.setDescription('Displays this servers settings')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers),

	async execute(interaction, profileData, client, server, color, guildData) {
        const helpEmbed = new EmbedBuilder()
        .setColor(color)
        .setTitle(`${interaction.guild}'s settings`)
        .setDescription(`• Color: **#${guildData.color.slice(2)}**\n\nSettings will be editable on a dashboard website that is coming soon.`)

        await interaction.reply({
            embeds: [ helpEmbed ],
        })
	},
};