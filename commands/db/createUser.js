const { SlashCommandBuilder, Message, InteractionCollector } = require("discord.js");

const {User} = require('../../database/models')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create_new_user')
		.setDescription('Adds a new user if one does not already exist in the db'),
	async execute(interaction) {
		const user = await User.findAll({
			where: {
				username: interaction.user.username
			}
		})
		if (user[0] === undefined) {
			const newUser = await User.create({
				username: interaction.user.username
			})
			await interaction.reply(`Created a new user with username: ${interaction.user.username}`)
		} if (user[0] !== undefined) {
			await console.log(user[0])
			await interaction.reply('User already exists!')
		}
	},
};