const { EmbedBuilder, InteractionType } = require("discord.js")
const Users = require('../models/userSchema');
const Guilds = require('../models/guildSchema');
const cooldown = new Set();
const cooldown_time = 2000; // 2 seconds cooldown time

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client){
        if(!interaction.type === InteractionType.ApplicationCommand) return;

        const command = client.commands.get(interaction.commandName);

        if(!command) return;   
        
        // check if the interaction was performed by a user on cooldown
        if (cooldown.has(interaction.user.id)) {
            /// If the cooldown did not end
            var cooldownEmbed = new EmbedBuilder()
            .setTitle(`Cooldown Timer`)
            .setColor("0xFFFFFF")
            .setDescription(`There is a 2 second cooldown between commands.`)
            return await interaction.reply({ 
                embeds: [cooldownEmbed], 
                ephemeral: true 
            });
        } else {
            //now, set cooldown
            cooldown.add(interaction.user.id);
            setTimeout(() => {
                // Removes the user from the set after 2 seconds
                cooldown.delete(interaction.user.id);
            }, cooldown_time );
        }

        var server;
        var color;
        if(!interaction.guild){
            server = "Direct message"
            color = "0xFFFFFF"
        }else{
            server = interaction.member.guild;
        }

        let profileData;
        let guildData;
        var memberID = interaction.user.id;

        try{
            /* user settings */
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
            
            /* guild setting */
            if(interaction.guild){ // ensuring the interaction was in a guild and not in a direct message
                var guildId = interaction.guildId;
                guildData = await Guilds.findOne({ guildID: guildId });
                if(!guildData){
                    let guild = await Guilds.create({
                        guildID: guildId,  
                        color: "0xFFFFFF",
                    })
                    guild.save();
                    guildData = await Guilds.findOne({ guildID: guildId });
                }
                color = guildData.color;
            }
                            
            /* executing the command with our parameters*/
            await command.execute(interaction, profileData, client, server, color, guildData);
        }catch(error){
            // Creating the error message to notify a developer
            let developer = client.users.cache.get("225690566225166336");
            var errorEmbed = new EmbedBuilder()
            .addFields(
                { name: 'Command', value: `${interaction.commandName}`, inline: true },
                { name: 'User', value: `${interaction.user.username}#${interaction.user.discriminator}`, inline: true },
                { name: 'Server', value: `${server}`, inline: true  },
            )
            // sending that error message to a developer
            developer.send({ 
                embeds: [errorEmbed] ,
                content: `${error.stack}`
            });

            // sending an error message to the user
            await interaction.reply({
                content: `:x: An error has occured, a developer has been notified.`,
                ephemeral: true
            })
        }
    }
};