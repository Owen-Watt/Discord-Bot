const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const Users = require('../../models/userSchema');
const options = { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tip')
		.setDescription('Tip a user cash')
        .addMentionableOption(user =>
            user.setName('user')
                .setDescription('User to tip')
                .setRequired(true))
        .addNumberOption(tip =>
            tip.setName('tip')
                .setDescription('Amount to tip')
                .setRequired(true))
        .setDMPermission(false),

	async execute(interaction, profileData, client, server, color) {
        var userToTip = interaction.options.getMentionable('user');
        var amountToTip = interaction.options.getNumber('tip');
        var tipEmbed = new EmbedBuilder()
        .setColor(color)
        .setTitle(`**Tip** :money_with_wings:`)
        .setDescription(`${interaction.member} sent **$${amountToTip.toLocaleString('en', options)}** to ${userToTip} `)

        targetData = await Users.findOne({ userID: userToTip.id });
        if(!targetData){
            let target = await Users.create({
                userID: userToTip.id,
                Hugs_Received: 0,
                Hugs_Given: 0,
                Stabs_Received: 0,
                Stabs_Given: 0,
                Punches_Received: 0,
                Punches_Given: 0,
                cash: 50000,
                Tax_Paid: 0,
                Coinflip_Wins: 0,
                Coinflip_Loses: 0,
                dailyClaimed: 0 
            })
            target.save();
        }

        if(profileData.cash>=amountToTip && amountToTip>0){
            await Users.findOneAndUpdate({
                userID: interaction.member.id,
            }, {
                $inc: {
                    cash: -amountToTip,
                },
            });
            await Users.findOneAndUpdate({
                userID: userToTip.id,
            }, {
                $inc: {
                    cash: amountToTip,
                },
            });

            await interaction.reply({ 
                embeds: [tipEmbed],
            });
        }else{
            tipEmbed = new EmbedBuilder()
            .setColor('0xff0000')
            .setTitle(`**Tip**`)
            .setDescription(`:x: You cannot tip $${amountToTip.toLocaleString('en', options)} to ${userToTip}\nBalance: **$${(profileData.cash).toLocaleString('en', options)}**`)

            await interaction.reply({ 
                embeds: [tipEmbed],
                ephemeral: true,
            });
        }
    }
};