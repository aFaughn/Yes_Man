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
		}).then((data) => {
			if (!data[0]) {
				Counter.create({
					name: 'barely',
					value: 1
				})
				interaction.reply(`Carter has barely known 'er 1 time!`)
			} else {
				data[0].update({ value: data[0].value + 1})
				interaction.reply(`Carter has barely known 'er ${data[0].value} times!`)

			}
		})
	},
};