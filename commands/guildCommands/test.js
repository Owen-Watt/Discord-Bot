const Users = require('../../models/userSchema');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('test command'),

	async execute(interaction, profileData, client, server, color) {

        const testEmbed = new EmbedBuilder()
        .setColor(color)
        .setDescription(`Test command`)

        await interaction.reply({ 
            embeds: [testEmbed],
        });
	},
};
