const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stab')
		.setDescription('Stab someone!')
        .addMentionableOption(stabbeduser =>
            stabbeduser.setName('user')
                .setDescription('The user to stab')
                .setRequired(true)),
 
	async execute(interaction) {
        let target = interaction.options.getMentionable('user');

        const stabEmbed = new Discord.MessageEmbed()
        .setColor('#F9FAFA')
        .setDescription(`${target} was stabbed by ${interaction.member} :knife:`)

        const botStab = new Discord.MessageEmbed()
        .setColor('#A00808')
        .setDescription(`:x: **Bots cannot be stabbed**`)

        const selfStab = new Discord.MessageEmbed()
        .setColor('#A00808')
        .setDescription(`:x: **You cannot stab yourself**`)

        if(target.user.bot){  // if they try to stab a bot
            await interaction.reply({ 
                embeds: [ botStab ],
            });
        }else if(interaction.member === target){   // if they try to stab themselves
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
