const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
const { User } = require("../../database/models");



module.exports = {
    data: new SlashCommandBuilder()
    .setName('powerball')
    .setDescription('Buy a lottery ticet!')
    .addIntegerOption(option =>
        option.setName('firstpick')
        .setDescription('Enter your first number between 1 and 10')
        .setRequired(true)
    )
    .addIntegerOption(option =>
        option.setName('secondpick')
        .setDescription('Select your second number between 1 and 10')
        .setRequired(true)
    )
    .addIntegerOption(option =>
        option.setName('thirdpick')
        .setDescription('Pick your final number between 1 and 10')
        .setRequired(true)
    ),

    async execute(interaction) {
        await User.findAll({where: {username: interaction.user.username}})
        .then(user => {
            console.log(user)
            
            if (user[0].points >= 100){
                user[0].update({points: user[0].points - 100})
                //These next few lines may look eerily similar to Allen's code in the gamba slash command...it is.
                
                //Grab user that executed the command.
                
                //Grab lotto ticket picks from args
                // TODO prevent users from entering integers greater than 10 and less than 0
                let firstNum = interaction.options.getInteger('firstpick')
                let secondNum = interaction.options.getInteger('secondpick')
                let thirdNum = interaction.options.getInteger('thirdpick')
                
                //Declares array for picks
                let picks = [firstNum, secondNum, thirdNum]
                
                //Picks winning numbers
        const firstWin = Math.round(Math.random()*10)
        const secondWin = Math.round(Math.random()*10)
        const thirdWin = Math.round(Math.random()*10)

        //Declares array for winning nums
        let wins = [firstWin, secondWin, thirdWin]

        //Declares Payout
        let Payout = 100000
        
        //Creates Matches number ???
        let matches = 0

        //Creates Dictionaries

        let winningnums = {}
        
        
        //Dynamic Object Population
        for (let i = 0; i<3; i++){
            if (winningnums[wins[i]] == undefined){
                winningnums[wins[i]] = 1
            }
            else {
                winningnums[wins[i]]++
            }
        }
        
        //Deprecated, but around for safekeeping.
        // let pickednums = {}
     /*   for (let i = 0; i<3; i++){
            if (pickednums[picks[i]] == undefined){
                pickednums[picks[i]] = 1
            }
            else {
                pickednums[picks[i]]++
            }
        } */

        //Check for matches
        for (let i = 0; i<3; i++){
            if (winningnums[picks[new String(i)]] > 0){
                winningnums[picks[new String(i)]]--
                matches++
            }
        }

        console.log(typeof(user[0].points))

        if (matches <= 1)
        {
            interaction.reply({content: `Number of matches: ${matches} \nNot enough matches, sorry! \nWinning Numbers: ${wins} \nYour Picks: ${picks} \nPoints Awarded: 0`, ephemeral: true})
        }

        if (matches == 2)
            {
                Payout = (Payout * 0.1)
                user[0].update({ points: (user[0].points + Payout)})
                interaction.reply({content: `Number of matches: ${matches} \n2 Matches! \nWinning Numbers: ${wins} \nYour Picks: ${picks} \nPoints Awarded: ${Payout}`, ephemeral: true})
            }
            
            if (matches == 3)
                {
                    user[0].update({ points: (user[0].points + Payout)})
                    interaction.reply({content: `Number of matches: ${matches} \n3 Matches! You win the jackpot! \nWinning Numbers: ${wins} \nYour Picks: ${picks} \nPoints Awarded: ${Payout}`, ephemeral: true})
                }

                
            }
            else {
             interaction.reply(`Not enough money to buy a lotto ticket... 👀 (use /give_points)`)
    }
    
    })
}
}
