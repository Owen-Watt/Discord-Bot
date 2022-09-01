const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('../config.json');

module.exports = (client) => {
	client.handleGuildCommands = async (commandFiles) => {
		client.guildCommandArray = [];

		for(const file of commandFiles){
			const command = require(`../commands/guildCommands/${file}`);
			client.commands.set(command.data.name, command);
			client.guildCommandArray.push(command.data.toJSON());
		}

		const rest = new REST({ version: '10' }).setToken(token);

		(async () => {
			try {	

				await rest.put(
					Routes.applicationGuildCommands(clientId, guildId),{ 
						body: client.guildCommandArray 
					},
				);
		
				console.log('Successfully reloaded GUILD (/) commands.');
			} catch (error) {
				console.error(error);
			}
		})();
	}

	client.handleGlobalCommands = async (commandFiles) => {
		client.globalCommandArray = [];

		for(const file of commandFiles){
			console.log(file)
			const command = require(`../commands/globalCommands/${file}`);
			client.commands.set(command.data.name, command);
			client.globalCommandArray.push(command.data.toJSON());
		}

		const rest = new REST({ version: '10' }).setToken(token);

		(async () => {
			try {
	
				await rest.put(
					Routes.applicationCommands(clientId),{ 
						body: client.globalCommandArray 
					},
				);
		
				console.log('Successfully reloaded GLOBAL (/) commands.');
			} catch (error) {
				console.error(error);
			}
		})();
	}
	
};

