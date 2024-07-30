const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildCreate,
    async execute(guild) {
        console.log(`Registered new guild: ${guild.name}`)
    }
}