const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");
const { Config, User, Guild } = require("../../database/models");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('config_update')
		.setDescription('Modify the configuration settings of Yes Man'),
	async execute(interaction) {
        const { client } = interaction
        // Security / Permissions check
        const curGuild = await Guild.findOne({where: {remoteId: interaction.guildId}})
        const beckoner = await User.findOne({where: {remoteId: interaction.user.id}})
        
        if (curGuild.ownerId === beckoner.remoteId) {
            const modal = new ModalBuilder()
            .setCustomId('configModal')
            .setTitle('Yes Man Configuration')

        const plexChannelId = new TextInputBuilder()
            .setCustomId('plexChannelId')
            .setLabel("Plex Request Channel ID")
            .setStyle(TextInputStyle.Short)

        const plexOwnerId = new TextInputBuilder()
            .setCustomId('plexOwnerId')
            .setLabel('Plex Channel Owner User-ID')
            .setStyle(TextInputStyle.Short)

        const APODChannelId = new TextInputBuilder()
            .setCustomId('APODChannelId')
            .setLabel('Nasa APOD Channel ID')
            .setStyle(TextInputStyle.Short)
        
        const BotModeratorId = new TextInputBuilder()
            .setCustomId('BotModeratorId')
            .setLabel('Bot Moderators: Seperate ID\'s with a (,)')
            .setStyle(TextInputStyle.Paragraph)

        const actionRow1 = new ActionRowBuilder().addComponents(plexChannelId)
        const actionRow2 = new ActionRowBuilder().addComponents(plexOwnerId)
        const actionRow3 = new ActionRowBuilder().addComponents(APODChannelId)
        const actionRow4 = new ActionRowBuilder().addComponents(BotModeratorId)

        modal.addComponents(actionRow1, actionRow2, actionRow3, actionRow4)
        
        await interaction.showModal(modal);

        } else {
            interaction.reply({
                content: `Sorry, only server owners and those specified as bot moderators may use this command.`,
                ephemeral: true
            })
        }
	},
};