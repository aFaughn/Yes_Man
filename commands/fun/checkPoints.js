import { SlashCommandBuilder } from "discord.js";
import { User } from "../../database/models/user.js";

export default{
	data: new SlashCommandBuilder()
		.setName('check_points')
		.setDescription('Check how many imaginary points you have'),
	async execute(interaction) {
        // Grab user who ran the command
		await User.findAll({where: {username: interaction.user.username}})
		.then((data) => {
			if (!data[0]) {
				interaction.reply('⚠ No user found!')
			} else {

				interaction.reply(`${interaction.user.username}, your point balance is ${data[0].points}.`)

			}
		})
	},
};