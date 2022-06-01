const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Displays list of commands'),

	async execute(interaction) {
        const helpEmbed = new MessageEmbed()
        .setColor("BLURPLE")
        .setTitle('Support Server')
        .setURL('https://discord.gg/mACacV4eG8')
        .setDescription(
        (`\n• \`\`/hug [user]\`\` - hugs the user ❤️`) +
        (`\n• \`\`/punch [user]\`\` - punches the user 🔪`) +
        (`\n• \`\`/stab [user]\`\` - stabs the user 👊`) +
        (`\n\n• \`\`/balance\`\` - view your cash balance 💰`) +
        (`\n• \`\`/daily\`\` - claims daily cash reward 🤑`) +
        (`\n• \`\`/coinflip [bet amount]\`\` - test your luck on a coinflip 💵`) +
        (`\n• \`\`/tip [tip amount] [user]\`\` - generously tip a user 🎁`) +
        (`\n\n• \`\`/leaderboard\`\` - view your servers cash leaderboard 🏆`) +
        (`\n• \`\`/stats [category] [user]\`\` - view a users statistics 📊`)
        )

        var response;
        // try catch to check if the user has direct messages turned on or off, if off, the response will display the error
        try{
            interaction.member.send({ 
                embeds: [ helpEmbed ]  
            });
            response = ":white_check_mark: Check your direct messages!"; 
        }catch(error){
            response = `:x: ${error}`
        }
        

        await interaction.reply({
            content: response,
            ephemeral: true,
        })
	},
};
