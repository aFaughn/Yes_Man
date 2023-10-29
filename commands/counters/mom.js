const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mom')
		.setDescription('Increment\'s the amount of times Quenton has made a "your mom" joke.'),
	async execute(interaction) {
        counter += 1;
		// await interaction.reply(`Quenton has made the "your mom" joke ${counter} times! It's always so funny!`);
		await interaction.reply(`Counters are temporarily disabled until I get linked to a **PostgreSQL** database. Sorry!`)
	},
};