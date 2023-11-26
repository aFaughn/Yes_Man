const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('plex_request')
		.setDescription('Creates a request for the plex server.')
        .addStringOption(option =>
            option.setName('Title')
                .setDescription('Title of the film. Duh.')
                .setRequired(true)),
	async execute(interaction) {


	},
};