import dotenv from 'dotenv';
dotenv.config();
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client, Collection, GatewayIntentBits } from 'discord.js';

import deployCommands from './events/deployCommands.js';
import { sequelize } from './database/index.js';

const token = process.env.API_KEY;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Deploy Commands
const dir = __dirname;
deployCommands(dir)

// Declare permissions that our bot will need in order to perform it's functions.
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers,
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
    const imported = await import(filePath);
		const command = imported.default || imported;
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


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
  const imported = await import(filePath);
  const event = imported.default || imported

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// client.login logs the bot in and sets it up for use. You'll enter your token here.
client.login(token);
