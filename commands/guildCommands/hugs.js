const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require('../../models/profileSchema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hugs')
		.setDescription('Shows your hug counter')
        .addMentionableOption(huggeduser =>
            huggeduser.setName('user')
                .setDescription('Check users hug counter')
                .setRequired(false)),

	async execute(interaction, profileData) {
        const target = interaction.options.getMentionable('user');
        if(!target){
            const hugCounterEmbed = new Discord.MessageEmbed()
            .setColor('#F9FAFA')
            .setDescription(`${interaction.member} has ${profileData.hugCounter} hugs :heart:`)

            await interaction.reply({ 
                embeds: [hugCounterEmbed],
                ephemeral: true
            });
        }else{
            try{
                profileData = await profileModel.findOne({ userID: target.id });
                if(!profileData){
                    let profile = await profileModel.create({
                        userID: target.id,
                        hugCounter: 0,
                    })
                    profile.save();
                }
                const hugCounterEmbed = new Discord.MessageEmbed()
                .setColor('#F9FAFA')
                .setDescription(`${target} has ${profileData.hugCounter} hugs`)

                await interaction.reply({ 
                    embeds: [hugCounterEmbed],
                });
            }catch(error){
                await interaction.reply({ 
                    content: `:x: ${error}`,
                    ephemeral: true
                });
            }
        }
	},
};