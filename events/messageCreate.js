const { MessageEmbed } = require("discord.js")
// when a message is sent in any channel the bot is able to view
module.exports = {
	name: 'messageCreate',
	async execute(message) {
        // if the message comes from a bot, ignore it
        if(message.author.bot) return;


        /* if(message.content.toLowerCase().trim() === '') {
           

        } */
	},
};