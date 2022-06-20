const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
// intents required to access those parts of the API
const client = new Client({ partials: ['CHANNEL', 'MESSAGE', 'REACTION'],
    intents: [
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_MEMBERS, 
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.GUILD_PRESENCES, 
]});

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
