const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
const { Counter } = require("../../database/models");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('carter_barely')
		.setDescription('Increment\'s the amount of times Carter has made a "barely even know her" joke.'),
	async execute(interaction) {
		const counter = await Counter.findAll({
			where: {
				name: 'barely'
			}
		})
		if (!counter[0]) {
			await Counter.create({
				name: 'barely',
				value: 0
			})
			await interaction.reply(`Carter has barely known 'er ${counter[0].value} times!`)
		}
		await counter[0].update({ value: counter[0].value + 1})
		.then(interaction.reply(`Carter has barely known 'er ${counter[0].value} times!`)
		)
	},
};