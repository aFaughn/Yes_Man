const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('plex_request')
		.setDescription('Creates a request for the plex server.')
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Title of the film. Duh.')
                .setRequired(true)),
	async execute(interaction) {
        // Destination channel
        const channelId = '1125153614441238621'

        const markComplete = new ButtonBuilder()
            .setCustomId('markcomplete')
            .setLabel('Mark Completed')
            .setStyle(ButtonStyle.Success)

        const markBad = new ButtonBuilder()
            .setCustomId('markBad')
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger)

        const row = new ActionRowBuilder()
            .addComponents(markComplete, markBad)

        const channel = client.channels.cache.get(channelId)
        channel.send({
            content: `${interaction.user.username} requested ${interaction.option.getString('title')}`,
            components: [row],
        })
	},
};