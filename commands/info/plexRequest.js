const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('plex_request')
		.setDescription('Creates a request for the plex server.')
        .addStringOption(option =>
            option.setName('Title')
                .setDescription('Title of the film. Duh.')
                .setRequired(true)),
	async execute(interaction) {
        // Destination channel
        const channelId = '1125153614441238621'

        const channel = client.channels.cache.get(channelId)
        channel.send(`${interaction.user.username} requested ${interaction.options.getString('Title')}`)
	},
};