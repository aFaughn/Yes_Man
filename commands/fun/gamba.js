const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
const { User } = require("../../database/models");

let badSlots = ['🍋🍒🥝','🍒🥝🍌', '👉👌😩']

module.exports = {
    data: new SlashCommandBuilder()
    .setName('gamba')
    .setDescription('Gamble imaginary points!')
    .addIntegerOption(option => 
        option.setName('wager')
        .setDescription('How many points you\'re willing to risk! (Setting wager to 0 will wager ALL YOUR POINTS!)')
        .setRequired(true)),
        async execute(interaction) {
            // Grab user who ran the command
            const user = await User.findAll({where: {username: interaction.user.username}})
            
            // Grab user's inventory
            // const inventory = JSON.parse(user[0].inventory)

            //Err handling -- No user
            if (!user[0]) {
                interaction.reply('⚠ No user found! Please run /create_user first!')
            }
            
            // Grab wager from args
            let wager = interaction.options.getInteger('wager')
            if (wager === 0) {
                wager = await user[0].points
            }

            //Define what our wager is exactly
            // if (wager === 'max') {
            //      if (inventory.upgrades.gambacap === 0) {
            //         wager = 50
            //      } else {
            //         wager = (inventory.upgrades.gambacap * 50) * inventory.upgrades.gambacap
            //      }
            // }

            //User is at their current point cap
            // if (user[0].points >= inventory.upgrades.pointscap) {
            //     await interaction.reply(`You are at your point cap. Buy an upgrade with /store`)
            //     return
            // }

            //User tried to wager more than they have
            if (user[0].points < wager) { await interaction.reply('⚠ Cannot wager more than you have!')}

            //Wager is not a number
            // else if (typeof wager !== 'number' && wager !== 'max') {await interaction.reply(`⚠ Wager is not an integer. Your wager: "${wager}"`)}

            //User has no points
            else if (user[0].points <= 0 || wager === 0) {
                await interaction.reply("⚠ You don't have any points to gamba with! Brokie!")
            } else {
                // Roll outcome
                // Note to dev: Switch case cannot be used here practically due to logic constraints
                const outcome = Math.floor(Math.random() * 100)
                let reward;
                if (outcome === 99 || outcome === 100) {
                    
                    reward = wager * 10
                    user[0].update({ points: user[0].points + reward}) 
                    interaction.reply(`[💎💎💎] \n (${outcome}) JACKPOT!!! You got ${reward}`)
                    
                } else if (outcome === 69) {
                    
                    reward = wager * 69
                    user[0].update({ points: user[0].points + reward })
                    interaction.reply(`[6️⃣9️⃣6️⃣9️⃣6️⃣9️⃣6️⃣9️⃣] \n LOLOLOLOLOLOLOLOL YOU ROLLED ${outcome} You got ${reward} points!`)
                    
                } else if (outcome >= 60 && outcome < 99 && outcome !== 69) {
                    
                    reward = wager * 3
                    user[0].update({ points: user[0].points + reward })
                    interaction.reply(`[🍒🍒🍒] \n (${outcome}) Big Winner! You got ${reward} points!`)
                    
                } else if (outcome >= 50 && outcome < 59) {
                    
                    reward = wager * 1.5
                    user[0].update({ points: user[0].points + reward })
                    interaction.reply(`[🍋🍋🍋] \n (${outcome}) Winner! You got ${reward} points!`)
                    
                } else if (outcome < 50 && outcome >= 45) {
                    
                    await interaction.reply(`[🍋💲💲] (${outcome}) Stale! You break even. (+0 points)`)
                    
                } else {
                    
                await user[0].update({ points: user[0].points - wager})
                interaction.reply(`[🍋🍒🥝] \n (${outcome}) Loss! You lost your wager! -${wager} points!`)
                
                }
            }
        },
};