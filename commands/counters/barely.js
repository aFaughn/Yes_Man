const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('carter_barely')
		.setDescription('Increment\'s the amount of times Carter has made a "barely even know her" joke.'),
	async execute(interaction) {
		// await interaction.reply(`Carter has yet to help me implement PostgreSQL into this bot! For shame!`);
		await interaction.reply(`Counters are temporarily disabled until I get linked to a **PostgreSQL** database. Sorry!`)	
	},
};