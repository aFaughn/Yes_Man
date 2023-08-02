const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('crazy')
		.setDescription('Prints the crazy copypasta'),
	async execute(interaction) {
		await interaction.reply("Crazy? \n I was crazy once. \n They put me in a room \n A rubber room \n A rubber room with rats \n The rats made me crazy.");
	},
};