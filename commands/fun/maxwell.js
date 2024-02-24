const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('maxwell')
		.setDescription('Maxwell'),
	async execute(interaction) {
		await interaction.reply({
            content: "https://tenor.com/view/maxwell-cat-spinning-spin-meme-gif-27388554",
        });
	},
};