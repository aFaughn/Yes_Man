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
            User.findAll({ where: {username: interaction.user.username}})
            .then(user => {
                let userpoints = Number(user[0].points)
                let allowroll = true

                if (userpoints <= 0) {
                    interaction.reply({content: 'You have no points to wager.', ephemeral: true})
                    allowroll = false
                } 

                if (wager == 0 && userpoints > 0) {
                    interaction.reply({content: `A minimum of 1 point must be wagered. \nIf you have zero points, use the /pointsgamba command.`, ephemeral: true})
                    allowroll = false
                }
                // Check if user is at or above the cap
                else if (userpoints >= 2000000000) {
                    interaction.reply({content: 'Sorry, you are at the points cap! Spend your points on something first.', ephemeral: true})
                    allowroll = false
                }
                // If the user tried to wager more than they have, tell the user they don't have enough points.
                else if (userpoints < wager && userpoints > 0) {
                    interaction.reply({content: `not enough points, friend. Max bet: ${userpoints}`, ephemeral: true})
                    allowroll = false
                }
                // Finally we can begin the process of rolling an outcome.
                 else {
                    if (allowroll == true){
                    const outcome = Math.floor(Math.random() * 100)
                    let reward;
                    // Jackpot
                    if (outcome === 99 || outcome === 100) {

                        reward = wager * 10
                        user[0].update({ points: user[0].points + reward  })
                        interaction.reply(`[💎💎💎] \n (${outcome}) JACKPOT!!! You got ${reward} \nNew Balance: ${user[0].points}`)

                    }
                    // 69
                    else if (outcome === 69) {
                    
                        reward = wager * 69
                        user[0].update({ points: user[0].points + reward  })
                        interaction.reply(`[6️⃣9️⃣6️⃣9️⃣6️⃣9️⃣6️⃣9️⃣] \n LOLOLOLOLOLOLOLOL YOU ROLLED ${outcome} You got ${reward} points! \nNew Balance: ${user[0].points}`)
                    
                    }
                    // Good Reward
                    else if (outcome >= 60 && outcome < 99 && outcome !== 69) {
                            
                        reward = wager * 3
                        user[0].update({ points: user[0].points + reward  })
                        interaction.reply(`[🍒🍒🍒] \n (${outcome}) Big Winner! You got ${reward} points! \nNew Balance: ${user[0].points}`)
                            
                    }
                    // Middling Reward
                    else if (outcome >= 50 && outcome < 59) {
                    
                        reward = wager * 1.5
                        user[0].update({ points: user[0].points + reward  })
                        interaction.reply(`[🍋🍋🍋] \n (${outcome}) Winner! You got ${reward} points! \nNew Balance: ${user[0].points}`)
                                
                    }
                    // Break Even
                    else if (outcome < 50 && outcome >= 45) {
                    
                        interaction.reply(`[🍋💲💲] (${outcome}) Stale! You break even. (+0 points) \nNew Balance: ${user[0].points}`)
                                
                    }
                    // Loss           |  || \n ||  |_
                    else if (outcome < 45){
                    
                        user[0].update({ points: user[0].points - wager  })
                        interaction.reply(`[🍋🍒🥝] \n (${outcome}) Loss! You lost your wager! -${wager} points! \nNew Balance: ${user[0].points}`)
                            
                    }
                }

                }

            })
        },
};