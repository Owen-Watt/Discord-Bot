const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const Users = require('../../models/userSchema');
const options = { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDescription('Receieve daily reward'),

	async execute(interaction, profileData, client, server, color) {
        var reward = 50000;

        const dailyRewardEmbed = new EmbedBuilder()
        .setColor('0x00FF00')
        .setTitle(`**Daily Reward**`)
        .setDescription(`User: ${interaction.member}\nClaimed: **$${reward.toLocaleString('en', options)}**\nNew Balance: **$${(profileData.cash+reward).toLocaleString('en', options)}**`)

        const alreadyClaimedEmbed = new EmbedBuilder()
        .setColor('0xff0000')
        .setTitle(`**Daily Reward**`)
        .setDescription(`:x: Already claimed today`)

        if((profileData.dailyClaimed+86400000)>Date.now()){
            await interaction.reply({ 
                embeds: [alreadyClaimedEmbed],
                ephemeral: true,
            });
        }else{
            await Users.findOneAndUpdate({ userID: interaction.member.id, }, {
                $inc: {
                    cash: reward,
                },
                $set: {
                    dailyClaimed: Date.now(),
                }
            });
            await interaction.reply({ 
                embeds: [dailyRewardEmbed],
            });
        }
        
    }
};