# Tokyo Discord Bot
Tokyo bot is a Discord Bot built with discord.js.
## Getting Started

### Prerequisites
- Node.js 
- discord.js@13.0.0+

### Installing
```sh
git clone https://github.com/Owen-Watt/discord-bot.git
cd discord-bot
npm install
```
- Put your bot token into ```token``` in the ```config.json``` file.
- Run the bot with the command ```node main.js```

- Similarly if you want to connect your bot to a MongoDB database, you put your database URL into ```mongo``` in the ```config.json``` file. 

```
Config.json
{
    "token": "",
    "guildId": "",
    "clientId": "",
    "mongo": ""
}
```

### Deployment
The Bot is deployed to Heroku.
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

###Authors
- **Owen Watt**