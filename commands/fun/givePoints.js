import { SlashCommandBuilder } from "discord.js";
import User from "../../database/models/user.js";

export default {
	data: new SlashCommandBuilder()
		.setName('pointsgamba')
		.setDescription('Gives you 100 points if you have 0'),
	async execute(interaction) {
        // Grab user who ran the command
		User.findAll({where: {username: interaction.user.username}})
        .then((data) => {
            if (!data[0]) {
                interaction.reply({ content: '⚠ No user found! Please run /create_user first!', ephemeral: true})
            } else if (data[0].points > 0) {
                interaction.reply({ content: `⚠ You may only run this command when you have 0 points!`, ephemeral: true })
            } else {
                data[0].update({ points: 100 })
                interaction.reply({ content: `Gave 100 points to ${interaction.user.username}`, ephemeral: true })
            }
        })
	},
};