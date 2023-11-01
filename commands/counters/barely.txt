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
		if (!counter[0]) {
			const newCounter = await Counter.create({
				name: 'barely',
				value: 0
			})
			await interaction.reply('Created a new counter.')
		}
		const counterVal = await counter.value
		counter.value = counterVal + 1
		await counter.set({ value: counter.value + 1})
		interaction.reply(`Carter has hardly known 'er ${counterVal + 1} times!`)
	},
};