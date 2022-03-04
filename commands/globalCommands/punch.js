const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('punch')
		.setDescription('Punch someone!')
        .addMentionableOption(huggeduser =>
            huggeduser.setName('user')
                .setDescription('The user to punch')
                .setRequired(true)),

	async execute(interaction) {
        const target = interaction.options.getMentionable('user');
        const punchEmbed = new Discord.MessageEmbed()
        .setColor('#F9FAFA')
        .setDescription(`${target} was punched by ${interaction.member} :anger:`)

        await interaction.reply({ 
            embeds: [punchEmbed],
        });
	},
};