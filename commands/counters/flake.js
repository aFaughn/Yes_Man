const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
const { Counter } = require("../../database/models");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('flake')
		.setDescription('Increment\'s the amount of times Allen turned down an offer to hang out with Carter.'),
	async execute(interaction) {
		const counter = await Counter.findAll({
			where: {
				name: 'flake'
			}
		})
		if (!counter[0]) {
			await Counter.create({
				name: 'flake',
				value: 0
			})
			await interaction.reply(`Allen has flaked ${counter[0].value} times!`)
		}
		await counter[0].update({ value: counter[0].value + 1})
		await interaction.reply(`Allen has flaked ${counter[0].value} times!`)
	},
};