const fs = require('fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js')
// intents required to access those parts of discord.js
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMembers, 
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.GuildVoiceStates,
    ]
});

const config = require('./config.json');

client.commands = new Collection();

// getting every javascript file from each folder 
const utility = fs.readdirSync('./util').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const guildCommandFiles = fs.readdirSync('./commands/guildCommands').filter(file => file.endsWith('.js'));
const globalCommandFiles = fs.readdirSync('./commands/globalCommands').filter(file => file.endsWith('.js'));

// async function to utitilise all the files found above
(async () =>{
    // requiring the files inside the utility folder
    for(file of utility){
        require(`./util/${file}`)(client)
    }

    // calling each of the functions/files
    client.handleDatabase();
    client.handleEvents(eventFiles);
    client.handleGuildCommands(guildCommandFiles);
    client.handleGlobalCommands(globalCommandFiles);
    client.login(config.token);
})();