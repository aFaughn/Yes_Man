const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
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
            interaction.reply(`Open Modal`)
        } else {
            interaction.reply({
                content: `Sorry, only server owners and those specified as bot moderators may use this command.`,
                ephemeral: true
            })
        }
	},
};