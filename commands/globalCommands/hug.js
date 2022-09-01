const Users = require('../../models/userSchema');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hug')
		.setDescription('Hug someone!')
        .addMentionableOption(huggeduser =>
            huggeduser.setName('user')
                .setDescription('The user to hug')
                .setRequired(true)),

	async execute(interaction, profileData, client, server, color) {
        const target = interaction.options.getMentionable('user');
        
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
        
        
        if(target != interaction.user){ 
            await Users.findOneAndUpdate({
                userID: interaction.user.id,
            }, {
                $inc: {
                    Hugs_Given: 1,
                }
            });

            await Users.findOneAndUpdate({
                userID: target.id,
            }, {
                $inc: {
                    Hugs_Received: 1,
                }
            });
        }

        const hugEmbed = new EmbedBuilder()
        .setColor(color)
        .setDescription(`${target} was **hugged** by ${interaction.user} :heart:`)

        await interaction.reply({ 
            embeds: [hugEmbed],
        });
	},
};
