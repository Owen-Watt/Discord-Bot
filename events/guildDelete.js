const { ActivityType } = require("discord.js")
// when a user leaves a server the bot is in
module.exports = {
	name: 'guildDelete',
	async execute(guild, client) {
		//setting the presence again so the servers count updates
		var action = ActivityType.Competing;
		var name = `${client.guilds.cache.size} servers`

		client.user.setPresence({ 
			activities: [{ name: name, type: action }], 
			status: 'online' 
		})
	},
};