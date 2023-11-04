const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
const { User } = require("../../database/models");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('carter_barely')
		.setDescription('Increment\'s the amount of times Carter has made a "barely even know her" joke.')
        .addStringOption(option => 
            option.setName('wager')
                .setDescription('How many points you\'re willing to risk!')
                .setRequired(true)),
	async execute(interaction) {
        // Grab user who ran the command
		const user = await User.findAll({where: {name: interaction.user.username}})

        //Err handling -- No user
		if (!user[0]) {
            interaction.reply('⚠ No user found! Please run /create_user first!')
		}

        // Grab wager from args
        const wager = parseInt(interaction.options.getString('wager'))

        //Err handling -- Bad wagers
        if (user[0].points < wager) { interaction.reply('⚠ Cannot wager more than you have!')}
        if (typeof wager != 'number') {interaction.reply('⚠ Wager is not an integer.')}
        if (user[0].points <= 0 || wager === 0) {
            interaction.reply("⚠ You don't have any points to gamba with! Brokie!")
        } else {
            // Roll outcome
            const outcome = Math.floor(Math.random() * 100)
            if (outcome === 99 || outcome === 100) {

                user[0].update({ points: user[0].points + (wager * 10) })
                interaction.reply(`|💎💎💎| \n JACKPOT!!! You got ${wager * 10}`)

            } else if (outcome >= 60 && outcome < 99) {

                user[0].update({ points: user[0].points + (wager * 2.44) })
                interaction.reply(`|🍒🍒🍒| \n Big Winner! You got ${wager * 2.44} points!`)

            } else if (outcome >= 50 && outcome < 59) {

                user[0].update({ points: user[0].points * 2.44 })
                interaction.reply(`|🍋🍋🍋| \n Winner! You got ${wager * 1.20} points!`)

            } else if (outcome < 50) {
                user[0].update({ points: user[0].points - wager})
                interaction.reply(`|🍋🍒🥝| \n Loss! You lost your wager! -${wager} points!`)
            }
        }
	},
};