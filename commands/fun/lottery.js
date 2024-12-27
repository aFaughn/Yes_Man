const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
const { User } = require("../../database/models");



module.exports = {
    data: new SlashCommandBuilder()
    .setName('buyTicket')
    .setDescription('Buy a lottery ticet!')
    .addIntegerOption(option =>
        option.SetName('firstPick')
        .setDescription('Enter your first number between 1 and 10')
        .setRequired(true)
    )
    .addIntegerOption(option =>
        option.SetName('secondPick')
        .setDescription('Select your second number between 1 and 10')
        .setRequired(true)
    )
    .addIntegerOption(option =>
        option.SetName('thirdPick')
        .setDescription('Pick your final number between 1 and 10')
        .setRequired(true)
    ),

    async execute(interaction) {
        
        //These next few lines may look eerily similar to Allen's code in the gamba slash command...it is.
        
        //Grab user that executed the command.
        const user = await User.findAll({where: {username: interaction.user.username}})

        //Err handling -- No user
        if (!user[0]) {
            interaction.reply('⚠ No user found! Please run /create_user first!')
        }

        //Grab lotto ticket picks from args
        let firstNum = interaction.options.getInteger('firstPick')
        let secondNum = interaction.options.getInteger('secondPick')
        let thirdNum = interaction.options.getInteger('thirdPick')

        //Declares array for picks
        let picks = [firstNum, secondNum, thirdNum]

        //Picks winning numbers
        const firstWin = Math.random(10)
        const secondWin = Math.random(10)
        const thirdWin = Math.random(10)

        //Declares array for winning nums
        let wins = [firstWin, secondWin, thirdWin]

        //Declares Payout
        let Payout = 100000

        //Creates Matches number ???
        let matches = 0

        for (let i = 0; i < 3; i++)
        {
           if (picks[i] == wins[i]){
            matches++
           }
        }

        if (matches <= 1)
        {
            await interaction.reply("Not enough matches, sorry!")
        }

        if (matches == 2)
            {
                Payout = (Payout * 0.1)
                user[0].update({points: User[0].points + Payout})
                await interaction.reply("2 Matches!")
            }

        if (matches == 3)
            {
                user[0].update({points: user[0].points + Payout})
                await interaction.reply("3 Matches! You win the jackpot!")
            }

       
    }


}