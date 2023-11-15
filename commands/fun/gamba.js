const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
const { User } = require("../../database/models");

let badSlots = ['🍋🍒🥝','🍒🥝🍌']

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gamba')
		.setDescription('Gamble imaginary points!')
        .addStringOption(option => 
            option.setName('wager')
                .setDescription('How many points you\'re willing to risk!')
                .setRequired(true)),
	async execute(interaction) {
        // Grab user who ran the command
		const user = await User.findAll({where: {username: interaction.user.username}})

        //Err handling -- No user
		if (!user[0]) {
            interaction.reply('⚠ No user found! Please run /create_user first!')
		}

        // Grab wager from args
        let wager = interaction.options.getString('wager').slice(0, interaction.options.getString('wager').length + 1);
        if (wager !== 'all' || typeof wager !== 'string') {
            wager = parseInt(interaction.options.getString('wager'))
        }
        //Err handling -- Bad wagers
        if (wager === 'all') { wager = parseInt(user[0].points)}
        if (user[0].points < wager) { await interaction.reply('⚠ Cannot wager more than you have!')}
        if (typeof wager !== 'number' && wager !== 'all') {await interaction.reply(`⚠ Wager is not an integer. Your wager: "${wager}"`)}
        if (user[0].points <= 0 || wager === 0) {
            await interaction.reply("⚠ You don't have any points to gamba with! Brokie!")
        } else {
            // Roll outcome
            const outcome = Math.floor(Math.random() * 100)
            let reward;
            if (outcome === 99 || outcome === 100) {

                reward = wager * 10
                await user[0].update({ points: user[0].points + reward})
                await interaction.reply(`[💎💎💎] \n (${outcome}) JACKPOT!!! You got ${reward}`)

            } else if (outcome === 69) {

                reward = wager * 69
                await user[0].update({ points: user[0].points + reward })
                await interaction.reply(`[6️⃣9️⃣6️⃣9️⃣6️⃣9️⃣6️⃣9️⃣] \n LOLOLOLOLOLOLOLOL YOU ROLLED ${outcome} You got ${reward} points!`)    

            } else if (outcome >= 60 && outcome < 99 && outcome !== 69) {

                reward = wager * 4
                await user[0].update({ points: user[0].points + reward })
                await interaction.reply(`[🍒🍒🍒] \n (${outcome}) Big Winner! You got ${reward} points!`)

            } else if (outcome >= 50 && outcome < 59) {

                reward = wager * 1.5
                await user[0].update({ points: user[0].points + reward })
                await interaction.reply(`[🍋🍋🍋] \n (${outcome}) Winner! You got ${reward} points!`)

            } else if (outcome < 50 && outcome >= 45) {

                await interaction.reply(`[🍋💲💲] (${outcome}) Stale! You break even. (+0 points)`)

            } else {
                await user[0].update({ points: user[0].points - wager})
                await interaction.reply(`[🍋🍒🥝] \n (${outcome}) Loss! You lost your wager! -${wager} points!`)
            }
        }
	},
};