const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

let counter = 0;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mom')
		.setDescription('Increment\'s the amount of times Quenton has made a "your mom" joke.'),
	async execute(interaction) {
        counter += 1;
		await interaction.reply(`Quenton has made the "your mom" joke ${counter} times! It's always so funny!`);
	},
};