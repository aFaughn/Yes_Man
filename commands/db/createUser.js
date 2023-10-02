const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('CreateNewUser')
		.setDescription('Adds a new user if one does not already exist in the db'),
	async execute(interaction) {
		await interaction.reply('Verifying user does not already exist....');
	},
};