const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('well')
		.setDescription('extends your well'),
	async execute(interaction) {
		await interaction.reply('WEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEELLLLLLLLLLLLL');
	},
};