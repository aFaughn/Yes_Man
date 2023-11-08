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
			order: [['points', 'DESC']],
			limit: 3
		})
        let gamers = []

        // Check if at least 1 user exists.
        if (!top3[0]) {
            await interaction.reply('No users exist!')
        } else {

            gamers.push(`${top3[0].username} - ${top3[0].points}`)

            if (top3[1]) {
                gamers.push(`${top3[1].username} - ${top3[1].points}`)
            }
            if (top3[2]) {
                gamers.push(`${top3[2].username} - ${top3[2].points}`)
            }

            await interaction.reply(`#1: ${gamers[0]} points \n#2: ${gamers[1] ? gamers[1] : 'N/a' } points \n#3: ${gamers[2] ? gamers[2] : 'N/a' } points`)   

        }
	},
};