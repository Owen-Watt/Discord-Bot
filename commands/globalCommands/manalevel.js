const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios').default;
const fetch = require("node-fetch")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('manalevel')
		.setDescription('Manacube ManaLevel info')
		.addStringOption(user =>
            user.setName('username')
                .setDescription('Minecraft username')
                .setRequired(true)),

	async execute(interaction, profileData, client, server, color) {
        await interaction.deferReply()
        const username = interaction.options.getString('username');
        const regex = /^[a-z0-9_]+$/i;
        if(username.length>16 || username.length<3 || !username.match(regex)){
            const lengthEmbed = new EmbedBuilder()
            .setColor(color)
            .setTitle(`:x: Error`)
            .setDescription(`Minecraft usernames must be between 3 and 16 characters (inclusive).`)

            return await interaction.editReply({ 
                embeds: [ lengthEmbed ],
            });
        }

        const minecraft_url = `https://api.mojang.com/user/profile/agent/minecraft/name/${username}`

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
        const api = `https://api.manacube.com/api/manalevel/${uuid}`

        axios.get(api)
        .then(async (response) => {
            var data = response.data;
            function getValue(key){
                var key = data.stats.find(item => item.key === key);
                return key? key.value : "0";
            }
            function getProgress(key){
                var key = data.stats.find(item => item.key === key);
                return key? key.progression : "0";
            }

            function kFormat(num) {
                return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
            }

            const infoEmbed = new EmbedBuilder()
            .setColor(color)
            .setAuthor({ name: `Manacube | ${minecraft.data.name}`, iconURL: 'https://pbs.twimg.com/profile_images/917978206224994304/sM4gyovn_400x400.jpg', url: `https://manacube.com/stats/player/${minecraft.data.name}/` })
            .addFields(
                { 
                    name: `Current XP: **${data.totalExp.toLocaleString()}**`, 
                    value: 
                    (`\nPlaytime(${kFormat(getValue('base:play_time')/24).toFixed(0)} days): **${(getValue('base:play_time')*100).toLocaleString()} XP**`) +
                    (`\nMob Kills(${kFormat(getValue('base:mob_kills')*100)}): **${Math.round((getProgress('base:mob_kills'))/5).toLocaleString()} XP**`) +
                    (`\nPlayer Kills(${kFormat(getProgress('base:player_kills'))}): **${(Math.round((getValue('base:player_kills')))*50).toLocaleString()} XP**`) +
                    (`\nBlocks Broken(${kFormat(getProgress('base:blocks_broken'))}): **${(getValue('base:blocks_broken')*10).toLocaleString()} XP**`) +
                    (`\nTrial Victory(${kFormat(getValue('command:victory'))}): **${(getProgress('command:victory')*300).toLocaleString()} XP**`) +
                    (`\nDaily Reward(${kFormat(getValue('command:daily'))}): **${(getProgress('command:daily')).toLocaleString()} XP**`) +
                    (`\nEasy Monster(${kFormat(getValue('command:easymonster'))}): **${(getProgress('command:easymonster')*5).toLocaleString()} XP**`) +
                    (`\nHard Monster(${kFormat(getValue('command:hardmonster'))}): **${(getProgress('command:hardmonster')*10).toLocaleString()} XP**`) +
                    (`\nQuests(${kFormat(getValue('command:quest'))}): **${(getProgress('command:quest')*100).toLocaleString()} XP**`) +
                    (`\nAchievements(${kFormat(getValue('command:achievement'))}): **${(getProgress('command:achievement')*100).toLocaleString()} XP**`) +
                    (`\nPond Catches(${kFormat(getValue('command:pond'))}): **${(getProgress('command:pond')*10).toLocaleString()} XP**`) +
                    (`\nVotes(${kFormat(getValue('command:votes'))}): **${(getProgress('command:votes')*75).toLocaleString()} XP**`),
                    inline: true
                },
                { 
                    name: '\u200B', 
                    value: 
                    (`\nRebirth(${kFormat(getValue('command:rebirth'))}): **${(getProgress('command:rebirth')*750).toLocaleString()} XP**`) +
                    (`\nPVP Fairies(${kFormat(getValue('command:pvpfairy'))}): **${(getProgress('command:pvpfairy')*50).toLocaleString()} XP**`) +
                    (`\nPrestiges(${kFormat(getValue('command:prestige'))}): **${(getProgress('command:prestige')*1500).toLocaleString()} XP**`) +
                    (`\nKOTH captures(${kFormat(getValue('command:koth'))}): **${(getProgress('command:koth')*200).toLocaleString()} XP**`) +
                    (`\nLMS Win(${kFormat(getValue('command:manaeventsqueue'))}): **${(getProgress('command:manaeventsqueue')*200).toLocaleString()} XP**`) +
                    (`\nBoss Kills(${kFormat(getValue('command:boss'))}): **${(getProgress('command:boss')*125).toLocaleString()} XP**`) +
                    (`\nAdventures(${kFormat(getValue('command:adventure'))}): **${(getProgress('command:adventure')*200).toLocaleString()} XP**`) +
                    (`\nEasy Maps(${kFormat(getValue('command:easy'))}): **${(getProgress('command:easy')*10).toLocaleString()} XP**`) +
                    (`\nMedium Maps(${kFormat(getValue('command:medium'))}): **${(getProgress('command:medium')*30).toLocaleString()} XP**`) +
                    (`\nHard Maps(${kFormat(getValue('command:hard'))}): **${(getProgress('command:hard')*50).toLocaleString()} XP**`) +
                    (`\nExpert Maps(${kFormat(getValue('command:expert'))}): **${(getProgress('command:expert')*75).toLocaleString()} XP**`) +
                    (`\nInsane Maps(${kFormat(getValue('command:insane'))}): **${(getProgress('command:insane')*125).toLocaleString()} XP**`),
                    inline: true 
                },
            )
            .setThumbnail(`https://visage.surgeplay.com/bust/512/${uuid}`)
            await interaction.editReply({ 
                embeds :[infoEmbed],
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
        });;
    }
};