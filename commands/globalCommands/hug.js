const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require('../../models/profileSchema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hug')
		.setDescription('Hug someone!')
        .addMentionableOption(huggeduser =>
            huggeduser.setName('user')
                .setDescription('The user to hug')
                .setRequired(true)),

	async execute(interaction, profileData) {
        try{
            const target = interaction.options.getMentionable('user');
            if(target != interaction.member){ //preventing self hugs adding to the counter
                profileData = await profileModel.findOne({ userID: target.id });
                if(!profileData){
                    let profile = await profileModel.create({
                        userID: target.id,
                        hugCounter: 0,
                    })
                    profile.save();
                }

                const response = await profileModel.findOneAndUpdate({
                    userID: target.id,
                }, {
                    $inc: {
                        hugCounter: 1,
                    }
                });
            }

            const hugEmbed = new Discord.MessageEmbed()
            .setColor('#F9FAFA')
            .setDescription(`${target} was hugged by ${interaction.member} :heart:`)
    
            await interaction.reply({ 
                embeds: [hugEmbed],
            });
        }catch(error){
            await interaction.reply({ 
                content: `:x: ${error}`,
                ephemeral: true
            });
        }
	},
};
