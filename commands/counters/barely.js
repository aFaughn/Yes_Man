const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
const { Counter } = require("../../database/models");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('carter_barely')
		.setDescription('Increment\'s the amount of times Carter has made a "barely even know her" joke.'),
	async execute(interaction) {
		const counter = await Counter.findAll({
			where: {
				name: 'hardly'
			}
		})
		const counterVal = await counter.value
		counter.value = counterVal + 1
		await counter.save();
		interaction.reply(`Carter has hardly known 'er ${counterVal + 1} times!`)
	},
};