# Tokyo Discord Bot
Tokyo bot is a Discord Bot built with discord.js.
## Getting Started

### Prerequisites
- Node.js 
- discord.js@13.0.0+
- MongoDB database

### Installing
```sh
git clone https://github.com/Owen-Watt/discord-bot.git
cd discord-bot
npm install
```
- Put your bot token into ```token``` in the ```config.json``` file.
- Run the bot with the command ```node main.js```

- Similarly to connect your bot to a MongoDB database, you put your database URL into ```mongo``` in the ```config.json``` file. 

```
config.json
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

## Examples
- /hug [user]

![Image of hug command](/images/hug.PNG)

- /coinflip [bet] (optional)

![Gif of coinflip command](https://gyazo.com/d310e9640867123a9deecacf4fbc3e80.gif)

## Authors
- **Owen Watt**