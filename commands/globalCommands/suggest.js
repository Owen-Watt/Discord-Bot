const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggest')
		.setDescription('Suggest features!')
        .addStringOption(option => 
            option.setName('suggestion')
                .setDescription('Enter your suggestion!')
                .setRequired(true)
        ),

	async execute(interaction, profileData, client) {
        const suggestion = interaction.options.getString('suggestion');

        const suggestion_player_embed = new MessageEmbed()
        .setColor("BLURPLE")
        .setTitle('Support Server')
        .setURL('https://discord.gg/mACacV4eG8')
        .setDescription(`**Thanks for the suggestion!**\n"${suggestion}"`)

        const suggestion_developer_embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle('Suggestion')
        .setDescription(`User: **${interaction.user.username}#${interaction.user.discriminator}**\nServer: **${interaction.member.guild}**\n\n"${suggestion}"`)

        var channel = client.channels.cache.get('988107222997417984');

        channel.send({
            embeds: [ suggestion_developer_embed ] 
        })

        await interaction.reply({
            embeds: [ suggestion_player_embed ],
            ephemeral: true,
        })
	},
};
