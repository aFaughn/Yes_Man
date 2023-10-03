const { SlashCommandBuilder, Message, InteractionCollector } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create_new_user')
		.setDescription('Adds a new user if one does not already exist in the db'),
	async execute(interaction) {
		console.log(interaction)
		await interaction.reply(String(interaction.type));
	},
};