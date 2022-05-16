# seggs-bot
Bot for various information on the game, 神殺しのアリア (KGA)

## Build
```
clone this repo
npm i / npm ci
edit config-EDITME and save as config.json
node deploy_commands.js
node .
```

### Images dependency
- The image assets are downloaded/cloned from [here](https://github.com/NamSPro/seggs-bot-assets)
- ~~For R18 assets to use with `/seggs`, contact me.~~ Not supported at the moment.

### config-EDITME
- If you wish to have a specific server deployed instantly, add a `guildId` field. Otherwise comment the `rest.put` which routes to `ApplicationGuildCommands`.
- If you wish to deploy to every server your bot joins, uncomment the `rest.put` which routes to `ApplicationCommands` in `deploy_commands.js`. In this case you don't need the `guildId` field.

## R18 Warning
`/seggs` is the command which will have R18 output. Use/deploy at your own risk.

## Credits
Thanks to the entire KGA English community, without which I wouldn't even have the idea to start this project.