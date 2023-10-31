require('dotenv').config()
const fs = require('node:fs');
const path = require('node:path');
const {Client, Collection, Events, GatewayIntentBits } = require(`discord.js`)
const token = process.env.API_KEY;
const db = require('./database')
const models = require('./database/models');
const sequelize = require('./database');
const { gapi } = require('gapi')

// Declare permissions that our bot will need in order to perform it's functions.
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ] 
 });

client.commands = new Collection();

// Dynamically loads all valid commands in ./commands
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

//
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
    
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;

  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true});
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeal: true});
    }
  }
})


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

// Google API Authentication and Sign-In
async function authenticate() {
  return gapi.auth2.getAuthInstance()
  .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
  .then(function() { console.log("Google API Signed in Successfully!"); },
        function(err) {console.log("Google API Failed to sign in. Error:", err)});
}
async function loadClient() {
  gapi.client.setApiKey(`${}`)
}

// Register an event so that when the bot is ready, it will log a messsage to the terminal
client.on('ready', () => {

  console.log(`Logged in as ${client.user.tag}!`);
})

// client.login logs the bot in and sets it up for use. You'll enter your token here.
client.login(token);