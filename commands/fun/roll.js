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
            .setDescription('Specify the amount of dice to roll')
            .setRequired(false)
        ),
	async execute(interaction) {
        let sides = await interaction.options.getInteger('die_type')
        let rolls = await interaction.options.getInteger('die_amount')
        if (rolls === null) rolls = 1;
        try {
            if (rolls === 1) {
                if (sides === null) {
                    const outcome = Math.floor(Math.random() * 20)
                    await interaction.reply(`${outcome}`)
                } else {
                    const outcome = Math.floor(Math.random() * sides)
                    await interaction.reply(`${outcome}`)
                }
            } else if (rolls > 1) {
                let results = []
                for (let i = 0; i < rolls; i++) {
                    let roll = Math.random()
                    results.push(roll)
                }
                let response = ''
                results.forEach(res => {
                    response.push(`[ ${res} ] `)
                })
                await interaction.reply(response)
            }
        } catch (e) {
            interaction.reply(`Something went wrong. Error: ${e}`)
        }
	},
};