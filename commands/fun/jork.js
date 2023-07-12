const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jorkin')
		.setDescription(':)'),
	async execute(interaction) {
		await interaction.reply("In the stripped club. straight up \n \"jorking it\". \n and by \"it\", haha, well. let's justr say.     \n My peanits");
	},
};