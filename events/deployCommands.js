import dotenv from 'dotenv'
dotenv.config()
import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';

const token = process.env.API_KEY
const clientId = process.env.CLIENT_ID
const devGuildId = process.env.GUILD_ID
const env = process.env.NODE_ENV

const deployCommands = async (dir) => {
    /*

    Parses the entire /commands folder for files with .js extension
    and registers them to the discord slashcommand api.

    Never put any .js files in commands if they are not commands or you -will- break
    this function.

    */
    const commands = [];
    // Grab all the command files from the commands directory you created earlier
    const foldersPath = path.join(dir, 'commands');
    const commandFolders = fs.readdirSync(foldersPath);
    
    for (const folder of commandFolders) {
        // Grab all the command files from the commands directory you created earlier
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const imported = await import(filePath);
            const command = imported.default || imported;
            if ('data' in command && 'execute' in command) {
                commands.push(command.data.toJSON());
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
    
    // Construct and prepare an instance of the REST module
    const rest = new REST().setToken(token);
    
    // and deploy your commands!
    (async () => {
        try {
            console.log(`Started refreshing ${commands.length} application (/) commands. Environment: ${env}`);
            
            if (env === 'development') {
                // The put method is used to fully refresh all commands in the guild with the current set
                // This is a faster way of refreshing commands on a development server.
                const data = await rest.put(
                    Routes.applicationGuildCommands(clientId, devGuildId),
                    { body: commands },
                );
                console.log(`Successfully reloaded ${data.length} application (/) commands.`);
            }
            
            // rest.put(
            //     Routes.applicationGuildCommands(clientId, '1050609633833779202'),
            //     { body: [] },
            // );
            
            if (env === 'production') {
                //Push commands to all guilds the bot is in.
                // These are only updated once per hour-ish and used for non-dev guilds.
                const data = await rest.put(
                    Routes.applicationCommands(clientId),
                    { body: commands },
                );
                console.log(`Sent ${data.length} commands to the global command registry.`);
            }
    
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
    })();
}

export default deployCommands