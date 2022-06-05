const { MessageEmbed } = require("discord.js")

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        client.user.setPresence({ activities: [{ name: `/help`, type: "LISTENING" }], status: 'online' });
	},
};