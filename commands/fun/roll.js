const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Roll a dice. Defaults to a 20 sided die.')
        .addIntegerOption(option =>
            option.setName('die_type')
            .setDescription('Specify how many sides the die rolled should have')
            .setRequired(false)
        ),
	async execute(interaction) {
        let sides = await interaction.options.getString('die_type')
        try {
            if (sides === null) {
                const outcome = Math.floor(Math.random() * 20)
                await interaction.reply(`${outcome}`)
            } else {
                const outcome = Math.floor(Math.random() * sides)
                await interaction.reply(`${outcome}, ${sides}`)
            }
        } catch (e) {
            interaction.reply(`Something went wrong. Error: ${e}`)
        }
	},
};