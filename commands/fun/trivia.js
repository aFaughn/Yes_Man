const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('trivia')
		.setDescription('Fetches a random piece of useless trivia.'),
	async execute(interaction) {
        const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random")
        const trivia = await response.json()
        await interaction.reply(`${trivia.text} \n *Source: ${trivia.source_url}*`)
	},
};