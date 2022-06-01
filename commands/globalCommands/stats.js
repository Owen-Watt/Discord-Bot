const { SlashCommandBuilder } = require('@discordjs/builders');
const Users = require('../../models/userSchema');
const { MessageEmbed } = require('discord.js');
const options = { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Shows your selected stats')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Category')
                .addChoice('Coinflip', 'Coinflip')
                .addChoice('Feelings', 'Feelings')
                .setRequired(true))
        .addMentionableOption(stabbedUser =>
            stabbedUser.setName('user')
                .setDescription('Check this users stats')
                .setRequired(false)
        ),

	async execute(interaction, profileData) {
        const category = interaction.options.getString('category');
        const target = interaction.options.getMentionable('user');
        var userToCheck = interaction.member;
        // if someone was specified, change the database profile to theirs and set the usertocheck to theirs too
        if(target){
            profileData = await Users.findOne({ userID: target.id });
            userToCheck = target;
        }

        //if they dont have a database profile yet, create one
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
                dailyClaimed: 0 
            })
            profile.save();
        }
        // then set profileData to the newly created database user
        profileData = await Users.findOne({ userID: userToCheck.id });

        switch(category){

            case "Coinflip":
            {
                var winRatio = (((profileData.Coinflip_Wins)/(profileData.Coinflip_Wins+profileData.Coinflip_Loses))*100).toFixed(2);
                if(isNaN(winRatio)){
                    winRatio = 0;
                }
                const statsEmbed = new MessageEmbed()
                .setColor('BLUE')
                .setDescription((`**${userToCheck}'s ${category} stats**`) +
                (`\n\nWins: **${profileData.Coinflip_Wins}**`) + 
                (`\nLoses: **${profileData.Coinflip_Loses}**`) + 
                (`\nWin %: **${winRatio}%**`) + 
                (`\nProfit: **$${profileData.Coinflip_Profit.toLocaleString('en', options)}**`) + 
                (`\nTax Paid: **$${profileData.Tax_Paid.toLocaleString('en', options)}**`)
                )
                
                await interaction.reply({ 
                    embeds: [statsEmbed],
                });
            }break;

            case "Feelings":
            {
                const statsEmbed = new MessageEmbed()
                .setColor('BLUE')
                .setDescription(`**${userToCheck}'s ${category} stats**`)
                .addFields(
                    { name: 'Hugs', value: `Given: **${profileData.Hugs_Given}**\nReceived: **${profileData.Hugs_Received}**`, inline: true },
                    { name: 'Stabs', value: `Given: **${profileData.Stabs_Given}**\nReceived: **${profileData.Stabs_Received}**`, inline: true },
                    { name: 'Punches', value: `Given: **${profileData.Punches_Given}**\nReceived: **${profileData.Punches_Received}**`, inline: true },
                )


                await interaction.reply({ 
                    embeds: [statsEmbed],
                });
            }break;
        }
	},
};