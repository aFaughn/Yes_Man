const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

const {Counter} = require('../../database/models/counters')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('carter_barely')
		.setDescription('Increment\'s the amount of times Carter has made a "barely even know her" joke.'),
	async execute(interaction) {
			
	},
};