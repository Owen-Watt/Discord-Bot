const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const Users = require('../../models/userSchema');
const options = { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coinflip')
		.setDescription('Heads or Tails?')
        .addNumberOption(bet =>
            bet.setName('bet')
                .setDescription('Bet amount')
                .setRequired(false)),


	async execute(interaction, profileData, client, server, color) {         
        let choice;
        let win
        let owner = interaction.user.id;
        var uniqueID = interaction.id;
        let chance = Math.random()>0.5;
        let answer = (chance) ? "Tails" : "Heads";
        let betAmount = interaction.options.getNumber('bet');
        var tax = 6;
        var taxedCash = ((tax / 100) * betAmount)
        if(!betAmount){
            betAmount = 0;
        }

        if(profileData.cash<betAmount){
            var balanceTooLowEmbed = new EmbedBuilder()
            .setColor('0xff0000')
            .setTitle("Coinflip :x:")
            .setDescription(`You cannot bet more than your balance!\nYour balance is **$${profileData.cash.toLocaleString('en', options)}**.`)
            return await interaction.reply({ 
                embeds: [balanceTooLowEmbed] ,
                ephemeral: true,
            })
        }

        if(betAmount<0){
            var negativeBetAmount = new EmbedBuilder()
            .setColor('0xff0000')
            .setTitle("Coinflip :x:")
            .setDescription(`You cannot bet less than $0!\nYour balance is **$${profileData.cash.toLocaleString('en', options)}**.`)
            return await interaction.reply({ 
                embeds: [negativeBetAmount],
                ephemeral: true,
            })
        }

        const buttons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('Heads')
                .setLabel('Heads')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('Tails')
                .setLabel('Tails')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('Cancel')
                .setLabel('Cancel')
                .setStyle(ButtonStyle.Danger),
        );
        var coinflipEmbed = new EmbedBuilder()
        .setColor(color)
        .setTitle("Coinflip")
        .setDescription(`Bet amount: **$${betAmount.toLocaleString('en', options)}**\nTax: **$${taxedCash.toLocaleString('en', options)}** (${tax}%)`)
        
        await interaction.reply({ 
            embeds: [coinflipEmbed],
            components: [buttons] ,
        });
        // filter to ensure the interaction author presses the buttons and prevents buttons being accepted for other interactions
        const filter = m => {
            var Author = m.user.id === owner;
            var sameInteraction = m.message.interaction.id === uniqueID;
            return Author && sameInteraction;
        } 
        const collector = interaction.channel.createMessageComponentCollector({ filter, idle:15000, max:1 });
        
        collector.on('collect', async i => { 
            choice = i.customId;
            win = (choice == answer);
            var taxedCash = (tax / 100) * betAmount
            const coinflipWinEmbed = new EmbedBuilder()
            .setColor('0x00FF00')
            .setTitle(`Coinflip - **Win**`)
            .setDescription(`${interaction.member} picked **${choice}**\nBet: **$${betAmount.toLocaleString('en', options)}**\nTax: **$${taxedCash.toLocaleString('en', options)}** (${tax}%)\nWon: **$${(betAmount-taxedCash).toLocaleString('en', options)}**\nNew Balance: **$${(profileData.cash+betAmount-taxedCash).toLocaleString('en', options)}**`)

            const coinflipLoseEmbed = new EmbedBuilder()
            .setColor('0xff0000')
            .setTitle(`Coinflip - **Loss**`)
            .setDescription(`${interaction.member} picked **${choice}**\nBet: **$${betAmount.toLocaleString('en', options)}**\nNew Balance: **$${(profileData.cash-betAmount).toLocaleString('en', options)}**`)

            win ? (coinflipEmbed = coinflipWinEmbed) : (coinflipEmbed = coinflipLoseEmbed);
        });

        collector.on('end', async (i, reason) => { 

            if(reason === "limit" && i.first().customId!=="Cancel"){

                if(win){
                    await Users.findOneAndUpdate({ userID: owner }, {
                        $inc: {
                            cash: (betAmount-taxedCash).toFixed(2),
                            Tax_Paid: taxedCash,
                            Coinflip_Wins: 1,
                            Coinflip_Profit: (betAmount-taxedCash).toFixed(2),
                        },
                    });

                    await i.first().update({
                        embeds: [coinflipEmbed],
                        components: [],
                    })

                }else{
                    await Users.findOneAndUpdate({ userID: owner }, {
                        $inc: {
                            cash: -betAmount,
                            Coinflip_Loses: 1,
                            Coinflip_Profit: -betAmount,
                        }
                    });

                    await i.first().update({
                        embeds: [coinflipEmbed],
                        components: [],
                    })
                }
            }

            if(choice === "Cancel"){
                coinflipEmbed = new EmbedBuilder()
                .setColor('0x000000')
                .setTitle('Coinflip')
                .setDescription(`**:x: Cancelled**`)
                await interaction.editReply({
                    embeds: [coinflipEmbed],
                    components: [],
                })
                setTimeout(async () => {
                    await interaction.deleteReply()
                }, 3000)
            }

            if(reason === "idle"){
                coinflipEmbed = new EmbedBuilder()
                .setColor('0x000000')
                .setTitle('Coinflip')
                .setDescription(`**:x: Timed out**`)
                await interaction.editReply({
                    embeds: [coinflipEmbed],
                    components: [],
                })
                setTimeout(async () => {
                    await interaction.deleteReply()
                }, 3000)
            }
        });
	},
};
