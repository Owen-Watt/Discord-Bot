module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        client.user.setPresence({ activities: [{ name: `${client.guilds.cache.size} servers`, type: "WATCHING" }], status: 'online' });
		//console.log(`${client.guilds.cache.size} servers with ${client.users.cache.size} people`)
	},
};