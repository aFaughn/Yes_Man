/*

Outline:
0. A player calls /blackjack with a 'wager' argument.
1. An instance of blackjack should be made.
2. 
3. A deck of cards is generated (13 cards / 4 suites)
4. The dealer and the player are dealt 2 random cards
    4a. In order to prevent duplicate cards from the same suit from appearing, any indice selected from the cards array should be blacklisted
    4b. If the card selecter rolls a duplicate card, it must roll again until an undealt card is given.
5. if the dealer / player has reached 21, the game ends and the house/player is declared winner.
6. If a player draws a card, that card should be added to their 'hand' and their current hand updated and printed back to them.
    6a. If the player still has only 2 cards, they may 'double down' and double their wager (assuming they have the money) and are forced to draw once, and then stay.
7. If the player chooses to 'stay':
    7a. The house must continue to draw to 16, if the house goes over, they bust and the game ends.
    7b. If the house draws an amount higher than the player, and lower than or equal to 21, they win and the player loses their wager.

*/


/*
Psuedo:
deck = [hearts,spades,diamonds,clubs]

func grabRandomCard = grab a random card

if userisnotplayingBlackJack
UserWhoRanThisCommand.isPlayingBlackJack =  true
UserWhoRanThisCommand.wager =  wager

UWRTC.houseHand = {2 new cards}
UWRTC.hand = {2 new cards}
UWRTC.wager = wager

if UWRTC.houseHand === 21 || UWRTC.hand === 21; Game over

interactionreply = Your hand is ____ the house is showing one card: card at indice 0

if argument is 'double down'
draw another card
if bust then lose
if lower than 21 draw house to 16+
compare
determine winner and call winner function

if argument is 'draw'
deal the player an additonional card
return current hand

if argument is 'stay'
draw house to 16+
determine winner

func determineWinner(playerHand, HouseHand) {
    compare hands()
    if winner house:
    remove player points
    tell player they lose. House had (amount) (hand)
    terminate blackjack instance
    clean blackjack vars
    if winner player:
    award player points double what they wagered, or 3:2 in the event of a blackjack
    tell player they won
    terminate blackjack instance
    clean blackjack vars
}
*/
const {SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const { User } = require("../../database/models");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('blackjack')
    .setDescription('Initializes a game of blackjack')
    .addIntegerOption(option => 
        option.setName('wager')
            .setDescription('Your wager in points.')
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

            dealer.forEach(card => {
               switch (card) {
                case 11: {
                    card = 'Jack'
                }
                case 12: {
                    card = 'Queen'
                }
                case 13: {
                    card = 'King'
                }
                case 14: {
                    card = 'Ace'
                }
               }
            })

            user.forEach(card => {
                switch (card) {
                    case 11: {
                        card = 'Jack'
                    }
                    case 12: {
                        card = 'Queen'
                    }
                    case 13: {
                        card = 'King'
                    }
                    case 14: {
                        card = 'Ace'
                    }
                   }
            })

            if (gamestate === 1) {
                reply = ` \`\`\` Dealer is showing a ${dealer[0]}\`\`\` \n You are holding: ${user[0]}, ${user[1]} `
                return reply
            } else {
                return 'We fucked up'
            }
        }



        //Grab user
        let user = await User.findOne({where: {username: interaction.user.username}})
        //Parse the blackjack object of user
        let blackjack = JSON.parse(user.blackjack)



        // Start a game of blackjack
        if (await blackjack.gameState === 0) {
            // Draw a card from the shoe
            const drawCard = () => (Math.floor(Math.random() * 14))

            // Draw user hand
            await blackjack.hands.user.push(drawCard())
            await blackjack.hands.user.push(drawCard())

            // Draw dealer hand
            await blackjack.hands.dealer.push(drawCard())
            await blackjack.hands.dealer.push(drawCard())

            blackjack.gameState = 1
            interaction.reply(replyBuilder(blackjack.hands.user, blackjack.hands.dealer, blackjack.gameState))
        }

        // await interaction.reply(`${await blackjack.gameState}`)
	},
};