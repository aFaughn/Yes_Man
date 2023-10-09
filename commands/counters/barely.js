const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

const {Counter} = require('../../database/models/counter')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('carter_barely')
		.setDescription('Increment\'s the amount of times Carter has made a "barely even know her" joke.'),
	async execute(interaction) {
			
	},
};