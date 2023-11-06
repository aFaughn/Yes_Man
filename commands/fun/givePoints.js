const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
const { User } = require("../../database/models");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pointsgamba')
		.setDescription('Gives you 100 points if you have 0'),
	async execute(interaction) {
        // Grab user who ran the command
		const user = await User.findAll({where: {username: interaction.user.username}})

        //Err handling -- No user
		if (!user[0]) {
            await interaction.reply('⚠ No user found! Please run /create_user first!')
		}
        if (!(user[0].points <= 0)) {
            await interaction.reply(`⚠ You may only run this command when you have 0 points!`)
        }

        await user[0].update({ points: 100 });
        await interaction.reply(`Gave 100 points to ${interaction.user.username}`)
	},
};