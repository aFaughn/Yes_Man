const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Roll a dice. Defaults to a 20 sided die.')
        .addIntegerOption(option =>
            option.setName('die_type')
            .setDescription('Specify how many sides the die rolled should have')
            .setRequired(false)
        )
        .addIntegerOption(option => 
            option.setName('die_amount')
            .setDescription('Specify the amount of dice to roll. Capped at 15')
            .setRequired(false)
        ),
	async execute(interaction) {
        let sides = await interaction.options.getInteger('die_type')
        let rolls = await interaction.options.getInteger('die_amount')
        if (rolls === null) rolls = 1;
        if (sides === null) sides = 20;
        if (rolls > 15) rolls = 15
        try {
            if (rolls === 1) {

                const outcome = Math.floor(Math.random() * sides)
                if (outcome === 0) outcome = 1
                await interaction.reply(`${outcome}`)

            } else if (rolls > 1) {

                let results = []
                for (let i = 0; i < rolls; i++) {
                    let roll = Math.floor(Math.random() * sides)
                    results.push(roll)
                }
                let response = ''
                results.forEach(res => {
                    if (res === 0) res = 1
                    response += `[ ${res} ] `
                })
                await interaction.reply(response)
             }
        } catch (e) {
            interaction.reply(`Something went wrong. Error: ${e}`)
        }
	},
};