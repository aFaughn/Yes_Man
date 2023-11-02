const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
const { Counter } = require("../../database/models");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mom')
		.setDescription('Increment\'s the amount of times Quenton has made a "your mom" joke.'),
	async execute(interaction) {
		const counter = await Counter.findAll({
			where: {
				name: 'mom'
			}
		})
		if (!counter[0]) {
			await Counter.create({
				name: 'mom',
				value: 1
			})
			await interaction.reply(`Quenton has made a "Your Mom" joke 1 time(s)!`)
		}
		await counter[0].update({ value: counter[0].value + 1})
		interaction.reply(`Quenton has made a "Your Mom" joke ${counter[0].value} times!`)
	},
};