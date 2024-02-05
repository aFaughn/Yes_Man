const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Roll a dice. Defaults to a 20 sided die.')
        .addIntegerOption(option => {
            option.setName('Die Type')
            .setDescription('Specify how many sides the die rolled should have')
            .setRequired(false)
        }),
	async execute(interaction) {
        try {
            if (interaction.option.getInteger('Die Type') === undefined) {
                const outcome = Math.floor(Math.random() * 20)
                interaction.reply(outcome)
            } else {
                const outcome = Math.floor(Math.random() * interaction.option.getInteger(`Die Type`))
                interaction.reply(outcome)
            }
        } catch (e) {
            interaction.reply(`Something went wrong. Error: ${e}`)
        }
	},
};