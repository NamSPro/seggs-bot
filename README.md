# seggs-bot
Bot for various information on the game, 神殺しのアリア (KGA)

## Build
```
clone this repo
npm i / npm ci
edit config-EDITME
node deploy_commands.js
nodemon
```

### config-EDITME
- If you only wish to deploy to one server, add a `guildId` field.
- If you wish to deploy to every server your bot joins, uncomment the `rest.put` which routes to `ApplicationCommands` and comment the  `rest.put` which routes to `applicationGuildCommands` in `deploy_commands.js`. In this case you don't need a `guildId` field.

## Credits
Thanks to the entire KGA English community, without which I wouldn't even have the idea to start this project.