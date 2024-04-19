const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dev_log_interaction')
		.setDescription('[DEV] Logs an interaction object to the console for developer purposes.'),
	async execute(interaction) {
        const { client } = interaction

        // THE way to check if this command is being run by a server owner.
        if (interaction.user.id === interaction.guild.ownerId) {
            await console.log(interaction)
            .then(interaction.reply({
                content: 'Check console.',
                ephemeral: true
            }))
        } else {
            interaction.reply({
                content: 'Sorry, this command can only be accessed by the server owner.',
                ephemeral: true
            })
        }
	},
};