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
		}).then((data)=>{
			if (!data[0]) {

				Counter.create({
				name: 'mom',
				value: 1
			})	
			interaction.reply(`Quenton has made a "Your Mom" joke 1 time!`)

			} else {
				data[0].update({ value: data[0].value + 1})
				interaction.reply(`Quenton has made a "Your Mom" joke ${data[0].value} times!`)
			}
			
		})
	},
};