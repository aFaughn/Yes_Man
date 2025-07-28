import { Events } from 'discord.js';

export default {
    name: Events.GuildCreate,
    async execute(guild) {
        console.log(`Registered new guild: ${guild.name}`)
        console.log('-------------------------------')
    }
}