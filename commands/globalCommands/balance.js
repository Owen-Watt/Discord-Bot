const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Users = require('../../models/userSchema');
const options = { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Display your balance')
        .addMentionableOption(user =>
            user.setName("target")
            .setDescription("Users balance to display")
            .setRequired(false)
        ),

	async execute(interaction, profileData) {
        let author;
        var target = interaction.options.getMentionable("target");

        // use the users nickname if it exists - otherwise use their account name
        if(interaction.member.nickname){
            author = interaction.member.nickname;
        }else{
            author = interaction.member.user.username
        }

        if(target){
            profileData = await Users.findOne({ userID: target.id });
            if(!profileData){
                let profile = await Users.create({
                    userID: target.id,
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
                    Coinflip_Profit: 0,
                    dailyClaimed: 0 
                })
                profile.save();
                profileData = await Users.findOne({ userID: target.id });
            }
            if(target.nickname){
                author = target.nickname;
            }else{
                author = target.user.username;
            }
        }

        const balanceEmbed = new MessageEmbed()
        .setColor('NAVY')
        .setTitle(`**${author}'s** Bank`)
        .setDescription(`Balance: **$${profileData.cash.toLocaleString('en', options)}**`)

        await interaction.reply({ 
            embeds: [balanceEmbed],
        });
    }
};