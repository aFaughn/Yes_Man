require('dotenv').config()
require('coffee-script/register')
const { deployCommands } = require('./events/deployCommands')
const fs = require('node:fs');
const path = require('node:path');
const {Client, Collection, Events, GatewayIntentBits } = require(`discord.js`)
const token = process.env.API_KEY;
// const gapi_api_key = process.env.YOUTUBE_API_KEY
// const oauthId = process.env.GOOGLE_OAUTH_ID
const db = require('./database')
const models = require('./database/models');
const sequelize = require('./database');
// const { gapi } = require('gapi')

// Deploy Commands
const dir = __dirname
deployCommands(dir)

// Declare permissions that our bot will need in order to perform it's functions.
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ] 
 });

 // Create a collection to store commands.
client.commands = new Collection();

// Dynamically loads all valid commands in ./commands.
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Dynamically create associations because we are lazy.
Object.keys(models).forEach(ele => {
  models[ele].associate(models);
})

//BEWARE! SETTING FORCE_DB_RESET TO 'TRUE' WILL --WIPE YOUR DB-- UPON ANY CHANGE!
async function dbSync() {
  await db.sync({force: process.env.FORCE_DB_RESET === 'true' ? true : false})
}
dbSync()

//DB Authentication
async function authDB() {
  try {
    await sequelize.authenticate();
    console.log(`Database connection O.K!`)
  } catch (e) {
    console.error('Unable to connect to D.B! Error:', e)
  }
}
authDB();

//Use node:fs to grab all events from events folder
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// client.login logs the bot in and sets it up for use. You'll enter your token here.
client.login(token);