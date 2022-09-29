const { ActivityType } = require("discord.js")
// when a user joins a server the bot is in
module.exports = {
	name: 'guildCreate',
	async execute(guild, client) {
        //setting the presence again so the server count updates
		var action = ActivityType.Competing;
		var name = `${client.guilds.cache.size} servers`

		client.user.setPresence({ 
			activities: [{ name: name, type: action }], 
			status: 'online' 
		}) 
	},
};