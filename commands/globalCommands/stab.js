const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const Users = require('../../models/userSchema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stab')
		.setDescription('Stab someone!')
        .addMentionableOption(stabbeduser =>
            stabbeduser.setName('user')
                .setDescription('The user to stab')
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
        if(target != interaction.member){ // if its not a self stab
            await Users.findOneAndUpdate({
                userID: interaction.user.id,
            }, {
                $inc: {
                    Stabs_Given: 1,
                }
            });

            await Users.findOneAndUpdate({
                userID: target.id,
            }, {
                $inc: {
                    Stabs_Received: 1,
                }
            });
        }

        const stabEmbed = new EmbedBuilder()
        .setColor(color)
        .setDescription(`${target} was **stabbed** by ${interaction.user} :knife:`)

        const selfStab = new EmbedBuilder()
        .setColor("0xff0000")
        .setDescription(`:x: **You cannot stab yourself**`)

        if(interaction.member === target){   // if they try to stab themselves
            await interaction.reply({
                embeds: [ selfStab ],
            })
        }else{   // correct usage
            await interaction.reply({ 
                embeds: [ stabEmbed ],
            });
        }
	},
};
