const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
const { User } = require("../../database/models");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('check_points')
		.setDescription('Check how many imaginary points you have'),
	async execute(interaction) {
        // Grab user who ran the command
		const user = await User.findAll({where: {username: interaction.user.username}})

        //Err handling -- No user
		if (!user[0]) {
            await interaction.reply('⚠ No user found! Please run /create_user first!')
		}

        await interaction.reply(`${interaction.user.username}, your point balance is ${user[0].points}.`)
	},
};