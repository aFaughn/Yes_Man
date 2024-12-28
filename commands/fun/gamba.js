const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
const { User } = require("../../database/models");

let badSlots = ['🍋🍒🥝','🍒🥝🍌', '👉👌😩']

module.exports = {
    data: new SlashCommandBuilder()
    .setName('gamba')
    .setDescription('Gamble imaginary points!')
    .addIntegerOption(option => 
        option.setName('wager')
        .setDescription('How many points you\'re willing to risk! (Setting wager to 0 will wager all your points <= 1000!)')
        .setRequired(true)),
        async execute(interaction) {
            let wager = interaction.options.getInteger('wager')
            User.findOne({ where: {username: interaction.user.username}})
            .then(user => {
                let userpoints = Number(user.points)

                if (userpoints === 0) {
                    interaction.reply({content: 'You have no points to wager.', ephemeral: true})
                } 
                // Check wager for max value
                else if (wager === 0 && userpoints < 2000000000) {
                    wager = 1000
                } 
                // Check if user is at or above the cap
                else if (userpoints >= 2000000000) {
                    interaction.reply({content: 'Sorry, you are at the points cap! Spend your points on something first.', ephemeral: true})
                }
                // If the user tried to wager more than they have, just wager all that is left <= 1000
                else if (userpoints < wager && wager <= 1000) {
                    wager = userpoints
                }
                // Finally we can begin the process of rolling an outcome.
                 else {
                    const outcome = Math.floor(Math.random() * 100)
                    let reward;
                    // Jackpot
                    if (outcome === 99 || outcome === 100) {

                        reward = wager * 10
                        data.update({ points: userpoints + reward  })
                        interaction.reply(`[💎💎💎] \n (${outcome}) JACKPOT!!! You got ${reward}`)

                    }
                    // 69
                    else if (outcome === 69) {
                    
                        reward = wager * 69
                        data.update({ points: userpoints + reward })
                        interaction.reply(`[6️⃣9️⃣6️⃣9️⃣6️⃣9️⃣6️⃣9️⃣] \n LOLOLOLOLOLOLOLOL YOU ROLLED ${outcome} You got ${reward} points!`)
                    
                    }
                    // Good Reward
                    else if (outcome >= 60 && outcome < 99 && outcome !== 69) {
                            
                        reward = wager * 3
                        data.update({ points: userpoints + reward })
                        interaction.reply(`[🍒🍒🍒] \n (${outcome}) Big Winner! You got ${reward} points!`)
                            
                    }
                    // Middling Reward
                    else if (outcome >= 50 && outcome < 59) {
                    
                        reward = wager * 1.5
                        data.update({ points: userpoints + reward })
                        interaction.reply(`[🍋🍋🍋] \n (${outcome}) Winner! You got ${reward} points!`)
                                
                    }
                    // Break Even
                    else if (outcome < 50 && outcome >= 45) {
                    
                        interaction.reply(`[🍋💲💲] (${outcome}) Stale! You break even. (+0 points)`)
                                
                    }
                    // Loss           |  || \n ||  |_
                    else {
                    
                        data.update({ points: userpoints - wager})
                        interaction.reply(`[🍋🍒🥝] \n (${outcome}) Loss! You lost your wager! -${wager} points!`)
                            
                    }

                }

            })
        },
};