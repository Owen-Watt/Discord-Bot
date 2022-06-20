const { MessageEmbed } = require("discord.js")

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        var command = '/help';
		var action = 'LISTENING';
		setInterval(updatePresence, 150000);
        
		function updatePresence(){
			switch(command){
				case '/help': command="/hug", action="PLAYING"; break;
				case '/hug': command="/suggest", action="WATCHING"; break;
				case '/suggest': command="/coinflip", action="PLAYING"; break;
				case '/coinflip': command="/help", action="LISTENING"; break;
			}
			client.user.setPresence({ activities: [{ name: `${command}`, type: `${action}` }], status: 'online' })
		}
	},
};