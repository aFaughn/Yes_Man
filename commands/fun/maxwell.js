import { SlashCommandBuilder } from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName('maxwell')
		.setDescription('Maxwell'),
	async execute(interaction) {
		await interaction.reply({
            content: "https://tenor.com/view/maxwell-cat-spinning-spin-meme-gif-27388554",
        });
	},
};