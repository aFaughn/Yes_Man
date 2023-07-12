const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('replis with world'),
	async execute(interaction) {
		await interaction.reply('World!');
	},
};