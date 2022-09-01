const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios').default;
const fetch = require("node-fetch")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cubits')
		.setDescription('Manacube cubit balance')
		.addStringOption(user =>
            user.setName('username')
                .setDescription('Minecraft username')
                .setRequired(true)),

	async execute(interaction, profileData, client, server, color) {
        const username = interaction.options.getString('username');
        const regex = /^[a-z0-9_]+$/i;
        if(username.length>16 || username.length<3 || !username.match(regex)){
            const lengthEmbed = new EmbedBuilder()
            .setColor(color)
            .setTitle(`:x: Error`)
            .setDescription(`Minecraft usernames must be between 3 and 16 characters (inclusive) and not contain special characters.`)

            return await interaction.reply({ 
                embeds: [ lengthEmbed ],
            });
        }

        const minecraft_url = `https://api.mojang.com/user/profile/agent/minecraft/name/${username}`

        try{
            var minecraft = await axios.get(minecraft_url)
            if(!minecraft.data){
                const noUserEmbed = new EmbedBuilder()
                .setColor(color)
                .setTitle(`:x: Error`)
                .setDescription(`User does not exist.`)
    
                return await interaction.reply({ 
                    embeds: [ noUserEmbed ],
                });
            }
            
            var uuid_raw = minecraft.data.id.split("");
            var uuid = "";
            for(var i = 0; i<uuid_raw.length; i++){
                if(i==8 || i==12 || i==16 || i==20){
                    uuid+="-"
                }
                uuid +=uuid_raw[i];
            }
            const api = `https://api.manacube.com/api/cubits/${uuid}`

            axios.get(api).then(async (response) => {
                var data = response.data;
       
                const infoEmbed = new EmbedBuilder()
                .setColor(color)
                .setDescription(`**${minecraft.data.name}**'s balance is **${data}** Cubits`)

                await interaction.reply({ 
                    embeds: [infoEmbed],
                });
            }).catch(async error => {
                if(error.response){
                    const maintenanceEmbed = new EmbedBuilder()
                    .setColor(color)
                    .setTitle(`:x: Error`)
                    .setDescription(`Manacube API is down.`)
        
                    return await interaction.editReply({ 
                        embeds: [ maintenanceEmbed ],
                    });
                }else{
                    console.log(error);
                    const Error = new EmbedBuilder()
                    .setColor(color)
                    .setDescription(`An Unknown Error has occured.`)
        
                    return await interaction.editReply({ 
                        embeds: [Error],
                    });
                }
            });
        }catch(err){
            const errorEmbed = new EmbedBuilder()
            .setColor(color)
            .setTitle(`:x: Error`)
            .setDescription(`API Error.`)

            await interaction.reply({ 
                embeds: [ errorEmbed ],
                ephemeral: true,
            });
        }

    }
};