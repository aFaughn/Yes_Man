const {SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActionRow} = require('discord.js');
const { User } = require("../../database/models");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('blackjack')
    .setDescription('Initializes a game of blackjack')
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
        
        // Builds a string reply that will make sense to the user.
            const replyBuilder = (user, dealer, gamestate) => {
                let reply = 'If you see this something fucked up.'

                let total = 0;

                for (let i = 0; i < user.length; i++) {
                    switch (user[i]) {
                        case 1:
                            user[i] = 'Ace';
                            total += 11
                        case 11:
                            user[i] = 'Jack';
                            total += 10
                        case 12:
                            user[i] = 'Queen';
                            total += 10
                        case 13:
                            user[i] = 'King';
                            total += 10
                        default:
                            total += user[i]
                    }
                }

                for (let i = 0; i < dealer.length; i++) {
                    switch (dealer[i]) {
                        case 1:
                            dealer[i] = 'Ace';
                        case 11:
                            dealer[i] = 'Jack';
                        case 12:
                            dealer[i] = 'Queen';
                        case 13:
                            dealer[i] = 'King';
                    }
                }

                if (gamestate === 1) {
                    reply = ` \`\`\`Wager: ${interaction.options.getInteger('wager')} points. \nDealer is showing: ${dealer[1]} \nYou are holding: ${user[0]}, ${user[1]} \nTotal: ${total}\`\`\``
                    return reply
                } else {
                    return 'Something went wrong.'
                }
            }



        //Grab user
            let user = await User.findOne({where: {username: interaction.user.username}})

        //Parse the blackjack object of user
            let blackjack = JSON.parse(user.blackjack)

        //Check if Wager is reset code
            if (interaction.options.getInteger('wager') === -1) {
                blackjack.gameState = 0;
                blackjack.wager = 0;
                blackjack.hands.dealer = [];
                blackjack.hands.user = [];

                await user.update({blackjack: JSON.stringify(blackjack)})
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

                blackjack.gameState = 1
                blackjack.wager = interaction.options.getInteger('wager')
                await user.update({blackjack: JSON.stringify(blackjack)})
                await interaction.reply({
                    content: replyBuilder(blackjack.hands.user, blackjack.hands.dealer, blackjack.gameState),
                    components: [row]
                })
            } else if (blackjack.gameState === 1) {
                await interaction.reply('You currently have a blackjack game in progress. Either finish it or pass -1 as your wager to reset your game.')
            }
        
	},
};