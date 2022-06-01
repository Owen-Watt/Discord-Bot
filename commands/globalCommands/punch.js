const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Users = require('../../models/userSchema');

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
        const punchEmbed = new MessageEmbed()
        .setColor('#F9FAFA')
        .setDescription(`${target} was **punched** by ${interaction.member} :anger:`)

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
        }

        if(target != interaction.member){ 
            await Users.findOneAndUpdate({
                userID: interaction.member.id,
            }, {
                $inc: {
                    Punches_Given: 1,
                }
            });

            await Users.findOneAndUpdate({
                userID: target.id,
            }, {
                $inc: {
                    Punches_Received: 1,
                }
            });
        }


        await interaction.reply({ 
            embeds: [punchEmbed],
        });
	},
};