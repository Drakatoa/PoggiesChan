const Discord = require('discord.js');

require('dotenv').config();

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

const fs = require('fs');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})

// const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
// for (const file of commandFiles) {
//     const command = require(`./commands/${file}`);

//     client.commands.set(command.name, command);
// }

// client.once('ready', () => {
//     console.log('Poggies is online!');
// });

// client.on('message', message => {
//     if (!message.content.startsWith(prefix) || message.author.bot) return;

//     const args = message.content.slice(prefix.length).split(/ +/);
//     const command = args.shift().toLowerCase();

//     if (command === 'mommy') {
//         client.commands.get('mommy').execute(message, args);
//     } else if (command == 'daddy') {
//         client.commands.get('daddy').execute(message, args);
//     } else if (command == 'play' || command == 'p') {
//         client.commands.get('play').execute(message, args);
//     }

// })


client.login(process.env.DISCORD_TOKEN);
