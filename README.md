# Tokyo Discord Bot
Tokyo bot is a Discord Bot built with discord.js.\
The bot is officially [verified](https://support.discord.com/hc/en-us/articles/1500006788922-Bot-Verification-FAQ-for-Parents-Legal-Guardians-and-Other-Sponsors) by Discord. \
Tokyo brings affection, economy and statistics to your Discord server.\
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

![gif of guild top command](https://gyazo.com/a54934fc441dcaa113f20717462ca3aa.gif)


## All Commands

| Command  | Description |
| ------------- |:-------------:|
| /hug [user]     | Hugs the user     |
| /stab [user]      | Stabs the user     |
| /punch [user]     | Punches the user     |
| /slap [user]     | Slaps the user     |
| /kiss [user]      | Kisses the user     |
| /balance [user]     | View a users cash balance    |
| /daily      | Claim daily cash reward     |
| /coinflip [bet]      | Flip a coin     |
| /tip [amount] [user]     | Tip a user    |
| /leaderboard      | View your servers cash leaderboard     |
| /stats [category] [user]     | View a users statistics    |
| /cubits [Minecraft name]    | View a users cubit balance on Manacube  |
| /manalevel [Minecraft name]    | View a users ManaLevel on Manacube  |
| /guild [Minecraft name]    | View a guilds information on Manacube  |
| /guildtop    | View the top guilds on Manacube  |
## Authors
- **Owen Watt**