import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import Config from '../../database/models/config.js';

export default {
	data: new SlashCommandBuilder()
		.setName('plex_request')
		.setDescription('Creates a request for the plex server.')
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Title of the film. Duh.')
                .setRequired(true)),
	async execute(interaction) {
        const { client } = interaction

        const config = await Config.findOne({
            where: {
                guildId: interaction.guildId
            }
        })

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

            const channel = await client.channels.fetch(config.plexChannel)
            
            const response = await channel.send({ 
                content: `<@${config.plexOwner}> ${interaction.user.username} requested *${interaction.options.getString('title')}*`,
                components: [row]
            })

            //This will throw an error in your console but it does work as intended.
        if (interaction.user.id !== config.plexOwner) {
            const acknowledge = await interaction.reply({
                content: `Request Made! This message will self destruct in 5 seconds!`,
                ephemeral: true
            })

            setTimeout(() => {
                acknowledge.delete()
            },5000)
        }   

	},
};