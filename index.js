require('dotenv').config()
const {Client, GatewayIntentBits } = require(`discord.js`)
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ] 
 });

// Register an event so that when the bot is ready, it will log a messsage to the terminal
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

// client.login logs the bot in and sets it up for use. You'll enter your token here.
const token = process.env.API_KEY;
client.login(token);