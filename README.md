# Get Chickened
React with chicken (or custom emojis) to random messages with your Discord.js bot. I made this in maybe 10 minutes out of bordem (yes it will be updated further). If you need help or have questions feel free to join my Discord server (https://discord.gg/4c8Rh7tWhv).

# What Does It Actually Do
This script makes your bot react to messages based on a random percentage chance. By deafult it uses chicken emojis (one at a 0.5% chance, one at 0.3%). It then posts an embed saying the user was chickened with a button to laugh at them. You can change the embeds description to something else. Here's an example:  
![Screenshot_9](https://user-images.githubusercontent.com/28911975/176108343-a5f6bcb8-9c59-47e7-9a65-23438dd8c6f6.png)  
And after clicking the "Laught at this user" button:  

![Screenshot_10](https://user-images.githubusercontent.com/28911975/176108510-fab52435-5223-45b5-9dfd-a936190381e1.png)

# Installtion & Setup
To install, all you need to do is run `npm i discord.js-chicken --save` in your working directory.  
Setup is fairly simple. Here's an example bot script with it:
```js
const Discord = require('discord.js');
const client = new Discord.Client({
  intents: [ Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS ]
});

const chicken = require('discord.js-chicken')(client, { postChannel: "DISCORD CHANNEL ID" });

client.login(DISCORD BOT TOKEN);
```
# Options
`postChannel` is the only required option, if you don't want it to post to a channel then you're boring.  
| Option | Type | Description | Default |  
| --- | --- | --- | --- |
| postChannel | String | ID of the channel for the bot to post the chicken embed | null |
| chance | Int | Chance (%) for the bot to react to messages | 0.5 |
| description | String | Text for the description of the posted embed | 0.5 |
| minPercent | Int | Integer for the minium number to be generated (reccomneded to leave default) | 0 |
| maxPercent | Int | Integer for the maxium number to be generated (reccomneded to leave default) | 100 |
| decimalPlaces | Int | How many decimel numbers to generate (reccomneded to leave default) | 2 |
| emojis | Array | Array of emojis to react with, can have seperate chances (see below) | [] |

# Having Multiple Emojis
You can make the bot react with multiple emojis, and also have those emojis use their own chances. The bot by default will use: 
```js
[ {chance: 0.5, emoji: "🐔"}, {chance: 0.3, emoji: "🐓"} ]
```
This will make the bot react with a chicken emoji at a 0.5% chance, and with a rooster emoji at a 0.3% chance (will react with both at this point). If you just wanted to make the bot react with both emojis but use the default chance you would do:
```js
[ "🐔", "🐓" ]
```
Here's the examples in a script:
```js
const Discord = require('discord.js');
const client = new Discord.Client({
  intents: [ Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS ]
});

const chicken = require('discord.js-chicken')(client, {
  postChannel: "DISCORD CHANNEL ID",
  emojis: [ {chance: 0.5, emoji: "🐔"}, {chance: 0.3, emoji: "🐓"}, ] // or [ "🐔", "🐓" ]
  chance: 10 // emojis set chance will override this one
});

client.login(DISCORD BOT TOKEN);
```
