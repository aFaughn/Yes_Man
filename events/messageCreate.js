const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        const content = message.content
        const authorName = message.author.username
        const authorId = message.author.id
        const timestamp = message.createdTimestamp
        const channelId = message.channelId

        
    }
}