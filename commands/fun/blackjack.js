const {SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActionRow} = require('discord.js');
const { User } = require("../../database/models");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('blackjack')
    .setDescription('[IN DEVELOPMENT][NON-FUNCTIONAL] Initializes a game of blackjack')
    .addIntegerOption(option => 
        option.setName('wager')
            .setDescription('Your wager in points. -1 will reset your game!')
            .setRequired(true)),
	async execute(interaction) {
        const { client } = interaction

        // While we could make a giant array that resembles a 6-Deck shoe,
        // it seems more practical to assign % values to cards and just 
        // let RNG decide.

        /*
            BlackJack Gamestate breakdown:
            0 - A game has yet to start and cards need to be dealt.
            1 - The first cards have been dealt, meaning the player has an opportunity to double down if they like
            2 - The Player has chosen to 'hit' a card and may no longer double down.
            3 - The Player has decided to 'stay' and the dealer must now draw to either 16 or higher than the player hand.

            Once points have been awarded or taken, the game state should ALWAYS be set to 0.
        */
        /*
            Card value representations:
             2-10: Standard numerical cards
             1: Ace
             11: Jack
             12: Queen
             13: King
        */
        
        // Builds a string reply that will make sense to the user.
            const replyBuilder = (user, dealer, gamestate) => {
                let reply = 'Something has gone wrong Try running /blackjack with a wager of -1.'

                let total = 0;

                for (let i = 0; i < user.length; i++) {
                    switch (user[i]) {
                        case 1:
                            total += 11
                            user[i] = 'Ace';
                            break;
                        case 11:
                            total += 10
                            user[i] = 'Jack';
                            break;
                        case 12:
                            total += 10
                            user[i] = 'Queen';
                            break;
                        case 13:
                            total += 10
                            user[i] = 'King';
                            break;
                        default:
                            total += user[i]
                            break;
                    }
                }

                for (let i = 0; i < dealer.length; i++) {
                    switch (dealer[i]) {
                        case 1:
                            dealer[i] = 'Ace';
                            break;
                        case 11:
                            dealer[i] = 'Jack';
                            break;
                        case 12:
                            dealer[i] = 'Queen';
                            break;
                        case 13:
                            dealer[i] = 'King';
                            break;
                    }
                }

                if (gamestate === 1) {
                    reply = ` \`\`\`Wager: ${interaction.options.getInteger('wager')} points. \nDealer is showing: ${dealer[1]} \nYou are holding: ${user[0]}, ${user[1]} \nTotal: ${total}\`\`\``
                    return reply
                } else {
                    return 'Something went wrong. Try using /blackjack and wagering -1.'
                }
            }
        
        // Terminate a blackjack instance by passing in the blackjack object and user
        async function resetGame (game, user) {
            game.wager = 0
            game.gameState = 0
            game.hands.dealer = []
            game.hands.user = []
            await user.update({blackjack: JSON.stringify(game)})
        }


        //Grab user
            let user = await User.findOne({where: {username: interaction.user.username}})

        //Parse the blackjack object of user
            let blackjack = JSON.parse(user.blackjack)

        //Check if Wager is reset code
            if (interaction.options.getInteger('wager') === -1) {
                await resetGame(blackjack, user)
                await interaction.reply('Your instance of blackjack has been reset!')
            }

        //Buttons

            // Button to allow the user to hit
            const blackjackUserHit = new ButtonBuilder()
                .setCustomId('blackjackUserHit')
                .setLabel('Hit')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('☝')
            
            // Button to stay
            const blackjackUserStay = new ButtonBuilder()
                .setCustomId('blackjackUserStay')
                .setLabel('Stay')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('✋')
            
            // Button to double down
            // TODO implement double down
            const blackjackUserDoubleDown = new ButtonBuilder()
                .setCustomId('blackjackUserDoubleDown')
                .setLabel('Double Down')
                .setStyle(ButtonStyle.Secondary)

            const row = new ActionRowBuilder()
                .addComponents(blackjackUserHit, blackjackUserStay)

        // Start a game of blackjack

            // Check if a game is already going or if the user is trying to reset the game.
            if (await blackjack.gameState === 0 && interaction.options.getInteger('wager') !== -1) {
                // Draw a card from the shoe
                const drawCard = () => {
                    let res = (Math.floor(Math.random() * 13))
                    if (res === 0) res += 1;
                    return res;
                }

                // Draw user hand
                await blackjack.hands.user.push(drawCard())
                await blackjack.hands.user.push(drawCard())

                // Draw dealer hand
                await blackjack.hands.dealer.push(drawCard())
                await blackjack.hands.dealer.push(drawCard())

                //Blackjack detection
                let dealerBlackJack = false
                let userBlackJack = false

                // Check both the dealer and user hands for 1 Face card and 1 Ace
                for (let i = 0; i < blackjack.hands.dealer.length; i++) {
                    if (blackjack.hands.dealer[i] >= 10 && blackjack.hands.dealer[i + 1] === 1) dealerBlackJack = true;
                    if (blackjack.hands.dealer[i] >= 10 && blackjack.hands.dealer[i - 1] === 1) dealerBlackJack = true;
                }
                for (let i = 0; i < blackjack.hands.user.length; i++) {
                    if (blackjack.hands.user[i] >= 10 && blackjack.hands.user[i + 1] === 1) userBlackJack = true;
                    if (blackjack.hands.user[i] >= 10 && blackjack.hands.user[i - 1] === 1) userBlackJack = true;
                }

                // First check for double BlackJack
                if (dealerBlackJack && userBlackJack) {
                    await resetGame(blackjack, user)
                    await interaction.reply(`Both you, and The Dealer drew a blackjack and broke even.`)
                } 

                // Then the dealer
                else if (dealerBlackJack) {
                    await user.update({points: user.points - wager});
                    await resetGame(blackjack, user)
                    interaction.reply(`Sorry! Dealer drew a blackjack, you lost ${wager}.`)
                }

                // Then the user
                else if (userBlackJack) {
                    await user.update({points: user.points + (wager * 1.5)})
                    await resetGame(blackjack, user)
                    interaction.reply(`Congratulations! You drew a blackjack! you earned ${wager * 1.5} points!`)
                }

                // Neither have BlackJack so we continue the game.
                else {
                    blackjack.gameState = 1
                    blackjack.wager = interaction.options.getInteger('wager')
                    await user.update({blackjack: JSON.stringify(blackjack)})
                    await interaction.reply({
                        content: replyBuilder(blackjack.hands.user, blackjack.hands.dealer, blackjack.gameState),
                        components: [row]
                    })
                }
                
            // A game of blackjack is ongoing
            } else if (blackjack.gameState === 1) {
                await interaction.reply('You currently have a blackjack game in progress. Either finish it or pass -1 as your wager to reset your game.')
            }
        
	},
};