const Users = require('../models/userSchema');
const { MessageEmbed } = require("discord.js")

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client){
        if(!interaction.isCommand()) return;
        if(!interaction.guild){
            return await interaction.reply({
                content: ":blush: Im flattered, but I don't respond to dms"
            })
        }

        const command = client.commands.get(interaction.commandName);

        if(!command) return;   
        
        let profileData;
        var memberID = interaction.member.id;
        var guildID = interaction.guildId;

        try{
            profileData = await Users.findOne({ userID: memberID });
            if(!profileData){
                let profile = await Users.create({
                    userID: memberID,
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
                profileData = await Users.findOne({ userID: memberID });
            }
            
            await command.execute(interaction, profileData, client);
        }catch(error){
            //console.log(error);
            let developer = client.users.cache.get("225690566225166336");
            var errorEmbed = new MessageEmbed()
            .setDescription(`:x: ${error}`)
            .addFields(
                { name: 'Command', value: `${interaction.commandName}`, inline: true },
                { name: 'Server', value: `${interaction.member.guild}`, inline: true  },
            )
            developer.send({ embeds: [errorEmbed] });

            await interaction.reply({
                content: `:x: An error has occured, a developer has been notified.`,
                ephemeral: true
            })
        }
    }
};