const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { plexOwner, plexChannel } = require('../../package.json').config


module.exports = {
	data: new SlashCommandBuilder()
		.setName('plex_request')
		.setDescription('Creates a request for the plex server.')
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Title of the film. Duh.')
                .setRequired(true)),
	async execute(interaction) {
        const { client } = interaction

        const markComplete = new ButtonBuilder()
            .setCustomId('markComplete')
            .setLabel('Mark Completed')
            .setStyle(ButtonStyle.Success)
            .setEmoji('✅')

        const markBad = new ButtonBuilder()
            .setCustomId('markBad')
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger)
            .setEmoji('✖')

        const row = new ActionRowBuilder()
            .addComponents(markComplete, markBad)

        const channel = await client.channels.fetch(plexChannel)

        const response = await channel.send({ 
            content: `${plexOwner} ${interaction.user.username} requested *${interaction.options.getString('title')}*`,
            components: [row]
        })

        const acknowledge = await interaction.reply({
            content: `Request Made! This message will self destruct in 5 seconds!`,
            ephemeral: true
        })

        setTimeout(() => {
            acknowledge.delete()
        },5000)
	},
};