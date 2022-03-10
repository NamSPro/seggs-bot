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
- If you wish have a specific server deployed instantly, add a `guildId` field.
- If you wish to deploy to every server your bot joins, uncomment the `rest.put` which routes to `ApplicationCommands` in `deploy_commands.js`. In this case you don't need the `guildId` field.

## Credits
Thanks to the entire KGA English community, without which I wouldn't even have the idea to start this project.