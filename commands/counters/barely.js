const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

let counter = 0;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('carter_barely')
		.setDescription('Increment\'s the amount of times Carter has made a "barely even know her" joke.'),
	async execute(interaction) {
        counter += 1;
		await interaction.reply(`Carter has made the "barely even know her!" joke ${counter} times! For shame!`);
	},
};