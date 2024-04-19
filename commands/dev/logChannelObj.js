const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dev_log_channel')
		.setDescription('[DEV] Logs a channel object to the console for developer purposes.'),
	async execute(interaction) {
        const { client } = interaction

        //User is owner?
        if (interaction.user.id === interaction.guild.ownerId) {
            await client.channels.fetch(await interaction.channelId)
            .then(channel => console.log(channel))
            .then(interaction.deferUpdate())
            .catch(console.error)
        } else {
            await interaction.reply({
                content: 'Sorry, only the server owner can run this command.',
                ephemeral: true
            });
        }
	},
};