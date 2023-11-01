const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('Say hello!'),
	async execute(interaction) {
		await interaction.reply(`<@${interaction.user.id}> Hi there! <:ZScheme:1111853072315060295>`);
	},
};