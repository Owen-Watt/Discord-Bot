const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const Users = require('../../models/userSchema');
const options = { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Display the cash leaderboard')
        .setDMPermission(false),
        
	async execute(interaction, profileData, client, server, color) {
        const data = new Map();
        const users = await Users.find({});
        let guild = client.guilds.cache.get(interaction.guildId);

        for(var user in users){
            var database = users[user];
            var accountInfo = client.users.cache.get(database.userID);

            // if the database user is in the guild and is not a bot, add it to the map 
            if(guild.members.cache.get(database.userID) && !accountInfo.bot){
                data.set(database.userID, database.cash);
            }
        }
        const sortedData = new Map([...data.entries()].sort((a, b) => b[1] - a[1]));

        var output = "";
        var counter = 0;

        sortedData.forEach(async (value, key) => {     
            counter++;
            let player = client.users.cache.get(key);
            output += `**#${counter}** ${player}:  **$${value.toLocaleString('en', options)}**\n`
            if(counter == 10){
                return;
            }
        })

        var leaderboardEmbed = new EmbedBuilder()
        .setColor(color)
        .setDescription(`:trophy: **${guild}'s Cash Leaderboard**\n\n${output}`)

        await interaction.reply({ 
            embeds: [leaderboardEmbed],
        });
    }
};