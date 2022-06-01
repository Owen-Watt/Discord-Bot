const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
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


	async execute(interaction, profileData) {         
        let choice;
        let win
        let owner = interaction.member.id;
        let chance = Math.random()>0.5;
        let answer = (chance) ? "Tails" : "Heads";
        let betAmount = interaction.options.getNumber('bet');
        var tax = 6;
        var taxedCash = ((tax / 100) * betAmount)
        if(!betAmount){
            betAmount = 0;
        }

        if(profileData.cash<betAmount){
            var balanceTooLowEmbed = new MessageEmbed()
            .setColor('RED')
            .setTitle("Coinflip :x:")
            .setDescription(`You cannot bet more than your balance!\nYour balance is **$${profileData.cash.toLocaleString('en', options)}**.`)
            return await interaction.reply({ 
                embeds: [balanceTooLowEmbed] ,
                ephemeral: true,
            })
        }

        if(betAmount<0){
            var negativeBetAmount = new MessageEmbed()
            .setColor('RED')
            .setTitle("Coinflip :x:")
            .setDescription(`You cannot bet less than $0!\nYour balance is **$${profileData.cash.toLocaleString('en', options)}**.`)
            return await interaction.reply({ 
                embeds: [negativeBetAmount],
                ephemeral: true,
            })
        }

        const buttons = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('Heads')
                .setLabel('Heads')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('Tails')
                .setLabel('Tails')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('Cancel')
                .setLabel('Cancel')
                .setStyle('DANGER'),
        );
        var coinflipEmbed = new MessageEmbed()
        .setColor('WHITE')
        .setTitle("Coinflip")
        .setDescription(`Bet amount: **$${betAmount.toLocaleString('en', options)}**\nTax: **$${taxedCash.toLocaleString('en', options)}** (${tax}%)`)
        
        await interaction.reply({ 
            embeds: [coinflipEmbed],
            components: [buttons] ,
        });
        const filter = m => m.member.id === owner; // filter to ensure the interaction author presses the buttons
        const collector = interaction.channel.createMessageComponentCollector({ filter, idle:15000, max:1 });
        
        collector.on('collect', async i => { 
            choice = i.customId;
            win = (choice == answer);
            var taxedCash = (tax / 100) * betAmount
            const coinflipWinEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(`Coinflip - **Win**`)
            .setDescription(`${interaction.member} picked **${choice}**\nBet: **$${betAmount.toLocaleString('en', options)}**\nTax: **$${taxedCash.toLocaleString('en', options)}** (${tax}%)\nWon: **$${(betAmount-taxedCash).toLocaleString('en', options)}**\nNew Balance: **$${(profileData.cash+betAmount-taxedCash).toLocaleString('en', options)}**`)

            const coinflipLoseEmbed = new MessageEmbed()
            .setColor('RED')
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
                coinflipEmbed = new MessageEmbed()
                .setColor('BLACK')
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
                coinflipEmbed = new MessageEmbed()
                .setColor('BLACK')
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
