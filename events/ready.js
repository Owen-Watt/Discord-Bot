const { webhookId, webhookToken } = require('../config.json');
const { MessageEmbed } = require("discord.js")

const webhookClient = new WebhookClient({ id: webhookId, token: webhookToken });

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        client.user.setPresence({ activities: [{ name: `/help`, type: "LISTENING" }], status: 'online' });
	},
};