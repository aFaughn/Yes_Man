const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    execute(client) {
        const channelId = '1050609635360526378' // Channel to send welcome message to

        const message = `Welcome new user`

        const channel = client.channels.fetch(channelId)

        channel.send(message)
    }
}