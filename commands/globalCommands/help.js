const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Displays list of commands')
        .setDMPermission(false),

	async execute(interaction, profileData, client, server, color) {
        const helpEmbed = new EmbedBuilder()
        .setColor(color)
        .setTitle('Support Server')
        .setURL('https://discord.gg/mACacV4eG8')
        .setDescription(
        (`\n\n**Feelings**`) + 
        (`\n• \`\`/hug [user]\`\` - hugs the user ❤️`) +
        (`\n• \`\`/punch [user]\`\` - punches the user 👊`) +
        (`\n• \`\`/stab [user]\`\` - stabs the user 🔪`) +
        (`\n\n**Economy**`) + 
        (`\n• \`\`/balance\`\` - view your cash balance `) +
        (`\n• \`\`/daily\`\` - claims daily cash reward `) +
        (`\n• \`\`/coinflip [bet amount]\`\` - flip a coin`) +
        (`\n• \`\`/tip [tip amount] [user]\`\` - give a user your cash`) +
        (`\n\n**Statistics**`) + 
        (`\n• \`\`/leaderboard\`\` - view your servers cash leaderboard `) +
        (`\n• \`\`/stats [category] [user]\`\` - view a users statistics `) + 
        (`\n\n**Manacube**`) + 
        (`\n• \`\`/cubits [Minecraft username]\`\` - view a users cubits balance`) + 
        (`\n• \`\`/manalevel [Minecraft username]\`\` - view a users ManaLevel`) +
        (`\n• \`\`/guild [Minecraft username]\`\` - view a users guild info`) +
        (`\n• \`\`/guildtop\`\` - view the top guilds`) +
        (`\n\n[https://tokyobot.xyz](https://tokyobot.xyz)`)
        )

        var response;
        var inServer = interaction.guild;
        try{
            if(inServer){
                interaction.member.send({ 
                    embeds: [ helpEmbed ]  
                });
                response = ":white_check_mark: Check your direct messages!"; 
            }else{
                return interaction.reply({ 
                    embeds: [ helpEmbed ]  
                });
            }
        }catch(error){
            // error will most likely be disabled direct messages
            response = `:x: ${error}`
        }
        
        await interaction.reply({
            content: response,
            ephemeral: true,
        })
	},
};
