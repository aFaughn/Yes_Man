const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
const { User } = require('../../database/models');
const sequelize = require("../../database");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboards')
		.setDescription('Returns the top 3 users with the most points.'),
	async execute(interaction) {
		const top3 = await User.findAll({
			attributes: ['points', 'username'], 
			order: sequelize.literal('max(points) DESC'),
			limit: 3
		})

		interaction.reply(` #1: ${top3[0].username} \n #2 ${top3[1].username} \n #3 ${top3[2].username}`)
	},
};