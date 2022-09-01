# Tokyo Discord Bot
Tokyo bot is a Discord Bot built with discord.js.\
The bot is officially [verified](https://support.discord.com/hc/en-us/articles/1500006788922-Bot-Verification-FAQ-for-Parents-Legal-Guardians-and-Other-Sponsors) by Discord. \
Hug, Punch or Stab your friends. Economy, Statistics and Manacube commands! \
\
<img alt="bot status widget" src="https://top.gg/api/widget/status/795289659579957268.svg"> \
<img alt="bot server count widget" src="https://top.gg/api/widget/servers/795289659579957268.svg">
## Getting Started

### Prerequisites
- Node.js 
- discord.js@14.0.0+
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

![Gif of coinflip command](https://gyazo.com/883c6c263fa99d75dc058cbc93f7b095.gif)

- /guildtop [page] (optional)

![Image of guild top command](/images/guildtop.PNG)

## Authors
- **Owen Watt**