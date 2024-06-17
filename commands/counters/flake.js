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
		}).then((data) => {
			if (!data[0]) {
				Counter.create({
					name: 'flake',
					value: 1
				})
				interaction.reply(`Allen has flaked ${data[0].value} times!`)
			} else {
				data[0].update({ value: data[0].value + 1})
				interaction.reply(`Allen has flaked ${data[0].value} times!`)
			}
		})
	},
};