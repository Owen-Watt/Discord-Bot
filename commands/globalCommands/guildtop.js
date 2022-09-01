const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const axios = require('axios').default;
const fetch = require("node-fetch")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('guildtop')
		.setDescription('Manacube guild leaderboard')
        .addIntegerOption(pageNumber =>
            pageNumber.setName('page')
                .setDescription('The page to view')
                .setRequired(false)),

	async execute(interaction, profileData, client, server, color) {
        await interaction.deferReply()
        const pageInput = interaction.options.getInteger('page');
        var page;
        pageInput ? page = pageInput : page = 1; // if there was a page input, we go to that, if not we set it to the first page
        var amount = 10; // defaulting 10 guilds to display on each page
        let owner = interaction.user.id;
        var totalPages;
        var api = `https://api.manacube.com/api/guilds/top/10000` // defaulting to 10000 even though they are 236 guilds as of right now - 28/8/22
        let guildData;
        const uniqueID = interaction.id;
        var noError = true;


        const calculatePagesCount = (pageSize, totalCount) => {
            // we suppose that if we have 0 items we want 1 empty page
            return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
        };

        
        axios.get(api)
        .then(async (response) => {
            var data = response.data;
            guildData = data;
            totalPages = calculatePagesCount(10, guildData.length);
            var backward = false;
            var forward = false

            if(page==1){ //  if on page 1, disable the last page button
                backward = true;
            }else if(page===totalPages){ //  else if on the last page, disable the next page button
                forward = true;
            }
            var buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`Back`)
                    .setLabel(`Last Page`)
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(backward),
                new ButtonBuilder()
                    .setCustomId(`Forward`)
                    .setLabel('Next Page')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(forward),
            );

            if(page>totalPages){
                page = totalPages;
            }
            if(page<1){
                page = 1;
            }
            var guildPosition = page*10
            let guilds = "";
            let i =1;
            data.forEach((guild) => {
                if(i>(guildPosition-10) && i<=guildPosition){
                    let owner = guild.members.find(user => user.rank === 'owner');
                    guilds += `#${i} \`${guild.tag}\` - Lvl **${guild.level}**  (\`${owner.name}\`)\n`
                }
                i++;
            })
            infoEmbed = new EmbedBuilder()
            .setColor(color)
            .setTitle(`:trophy: Manacube Guild Leaderboard`)
            .setDescription(`${guilds}`)
            .setFooter({ text: `Page ${page} of ${totalPages}`})

            await interaction.editReply({ 
                embeds: [infoEmbed],
                components: [buttons]
            });
        }).catch(async error => {
            noError = false;
            if(error.response){
                const maintenanceEmbed = new EmbedBuilder()
                .setColor(color)
                .setTitle(`:x: Error`)
                .setDescription(`Manacube API is down.`)
    
                return await interaction.editReply({ 
                    embeds: [ maintenanceEmbed ],
                });
            }
        });

        var infoEmbed = new EmbedBuilder()
        .setColor(color)
        .setTitle(`:trophy: Manacube Guild Leaderboard`)
        .setDescription(`Error`)

        async function fetchGuilds(page){
            var guildPosition = page*10
            var backward = false;
            var forward = false

            if(page==1){ //  if on page 1, disable the last page button
                backward = true;
            }else if(page===totalPages){ //  else if on the last page, disable the next page button
                forward = true;
            }
            var buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`Back`)
                    .setLabel(`Last Page`)
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(backward),
                new ButtonBuilder()
                    .setCustomId(`Forward`)
                    .setLabel('Next Page')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(forward),
            );

            let guilds = "";
            let i =1;
            guildData.forEach((guild) => {
                if(i>(guildPosition-10) && i<=guildPosition){
                    let owner = guild.members.find(user => user.rank === 'owner');
                    guilds += `#${i} \`${guild.tag}\` - Lvl **${guild.level}**  (\`${owner.name}\`)\n`
                }
                i++;
            })
            infoEmbed = new EmbedBuilder()
            .setColor(color)
            .setTitle(`:trophy: Manacube Guild Leaderboard`)
            .setDescription(`${guilds}`)
            .setFooter({ text: `Page ${page} of ${totalPages}`})

            await interaction.editReply({ 
                embeds: [infoEmbed],
                components: [buttons]
            });
        }
        // filter to ensure the interaction author presses the buttons and prevents buttons being accepted for other interactions
        const filter = m => {
            var Author = m.user.id === owner;
            var sameInteraction = m.message.interaction.id === uniqueID;
            return Author && sameInteraction && noError;
        } 
        const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, filter, idle:30000 });
        
        collector.on('collect', async i => { 
            i.deferUpdate();
            choice = i.customId;
            if(choice === `Forward`){
                page++;
                fetchGuilds(page);
            }
            if(choice === `Back`){
                page--;
                fetchGuilds(page);
            }
        });

        collector.on('end', async (i, reason) => { 
            if(reason === "idle"){
                await interaction.editReply({
                    embeds: [infoEmbed],
                    components: [],
                })
            }
        });

    }
};