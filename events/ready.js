const { ActivityType } = require("discord.js")

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Logged in as ${client.user.tag} in ${client.guilds.cache.size} servers`);
		// setting the bots status to "Competing in [server count] servers"
		client.user.setPresence({ 
			activities: [{ name: `${client.guilds.cache.size} servers`, type: ActivityType.Competing}], 
			status: 'online' 
		})
	},
};