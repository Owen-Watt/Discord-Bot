const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios').default;
const fetch = require("node-fetch")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('guild')
		.setDescription('Manacube guild info')
		.addStringOption(user =>
            user.setName('username')
                .setDescription('Minecraft username')
                .setRequired(true)),

	async execute(interaction, profileData, client, server, color) {
        await interaction.deferReply();
        const username = interaction.options.getString('username');
        const regex = /^[a-z0-9_]+$/i;
        if(username.length>16 || username.length<3 || !username.match(regex)){
            const lengthEmbed = new EmbedBuilder()
            .setColor(color)
            .setTitle(`:x: Error`)
            .setDescription(`Minecraft usernames must be between 3 and 16 characters (inclusive) and not contain special characters.`)

            return await interaction.editReply({ 
                embeds: [ lengthEmbed ],
                ephemeral: true,
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
    
                return await interaction.editReply({ 
                    embeds: [ noUserEmbed ],
                    ephemeral: true,
                });
            }

            var uuid_raw = minecraft.data.id.split("");
            var uuid = "";
            // adding the dashes to the trimmed uuid
            for(var i = 0; i<uuid_raw.length; i++){
                if(i==8 || i==12 || i==16 || i==20){
                    uuid+="-"
                }
                uuid +=uuid_raw[i];
            }
            const api = `https://api.manacube.com/api/guilds/player/${uuid}`

            axios.get(api)
            .then(async (response) => {
                var data = response.data;
                // if the user is not in a guild
                if(!data){
                    const noGuildEmbed = new EmbedBuilder()
                    .setColor(color)
                    .setDescription(`**${minecraft.data.name}** is not in a guild.`)
        
                    return await interaction.editReply({ 
                        embeds: [noGuildEmbed],
                    });
                }

                let owner = data.members.find(user => user.rank === 'owner'); // getting the owner of the guild
                let members =[]; // array to store the members names
                data.members.forEach((member) => {
                    members.push(member.name)
                })
                var dateData = data.createDate;

                var year = dateData.slice(0, 4)
                var month = parseInt(dateData.slice(5, 7))-1; // minus 1 because its gonna be searching a 0 indexed array
                var day = parseInt(dateData.slice(8, 10))

                var displayDay;
                if(day%10==1){
                    displayDay = `${day}st`
                }else if(day%10==2){
                    displayDay = `${day}nd`
                }else if(day%10==3){
                    displayDay = `${day}rd`
                }else{
                    displayDay = `${day}th`
                }
                
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                var displayMonth = months[month];

                var display_date = `${displayMonth} ${displayDay}, ${year}`

                const infoEmbed = new EmbedBuilder()
                .setColor(color)
                .setTitle(`${data.tag}`)
                .addFields(
                    { 
                        name: `Guild Stats`, 
                        value: 
                        (`\nLevel: **${data.level}**`) +
                        (`\nRank: **#${data.rank}**`),
                        inline: true
                    },
                    { 
                        name: '\u200B', 
                        value: 
                        (`\nOwner: **${owner.name}**`) +
                        (`\nCreated: **${display_date}**`),
                        inline: true 
                    },
                    {
                        name:'Members',
                        value:(`\n\n\`\`${members.join(", ")}\`\``),
                    }
                )

                await interaction.editReply({ 
                    embeds: [infoEmbed],
                });
            }).catch(async (error) => {
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
            console.log(err);
            const errorEmbed = new EmbedBuilder()
            .setColor(color)
            .setTitle(`:x: Error`)
            .setDescription(`Cannot fetch user.`)

            await interaction.editReply({ 
                embeds: [ errorEmbed ],
            });
        }

    }
};

