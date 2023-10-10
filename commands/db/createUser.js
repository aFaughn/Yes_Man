const { SlashCommandBuilder, Message, InteractionCollector } = require("discord.js");

const { User } = require('../../database/models')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create_new_user')
		.setDescription('Adds a new user if one does not already exist in the db')
		.addStringOption(option =>
			option.setName('username') 
				.setDescription('username')
				.setRequired(false)),
	async execute(interaction) {
		// Grab additional arguements if there are any
		// const args = await interaction.options.getString('username')

		// if (!args) {
		// 	// Check if user already exists
		// 	const user = await User.findAll({
		// 		where: {
		// 			username: interaction.user.username
		// 		}
		// 	})
		// 	if (!user[0]) {
		// 		// Create new user
		// 		const newUser = await User.create({
		// 			username: interaction.user.username
		// 		})
		// 		await interaction.reply(`Created a new user with username: ${interaction.user.username}`)
		// 	} if (user[0]) {
		// 		// Alert sender the user already exists
		// 		await interaction.reply('User already exists.')
		// 	}
		// } else {
		// 	// Check if user already exists
		// 	const user = await User.findAll({
		// 		where: {
		// 			username: args
		// 		}
		// 	})
		// 	if (!user[0]) {
		// 		const newUser = await User.create({
		// 			username: args
		// 		})
		// 		await interaction.reply(`Created a new user with username: ${args}`)
		// 	} if (user[0]) {
		// 		await interaction.reply('User already exists.')
		// 	}
		// }



	},
};