const { Events } = require('discord.js');
const { User } = require("../database/models");
const blackjack = require('../commands/fun/blackjack');
let film;
let calculateTotal = (hand) => {
	return hand.reduce((accum, cur) => {

		if (cur === 1) {

			accum += 11

		}

		if (cur === 11 || cur === 12 || cur === 13) {

			accum += 10

		}

		if (cur === 14) {

			accum += 1

		}

	})
}
const resetGame = {
	wager: 0,
	gameState: 0,
	hands: {
		dealer: [],
		user: [],
	}
}

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		const { client } = interaction;

		// Slash Command listeners
		if (interaction.isChatInputCommand()) {
			
			const command = interaction.client.commands.get(interaction.commandName);
			
			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}
			
			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
			}

		// Button listeners--------------------
		} else if (interaction.isButton()) {

			// BlackJack ------------
			if (interaction.customId === 'blackjackUserHit') {
				//Hit Logic
				const newCard = Math.floor(Math.random() * 13)
				let user = await User.findOne({where: {username: interaction.user.username}});
				let blackjack = JSON.parse(user.blackjack)
				blackjack.hands.user.push(newCard)
				await user.update({blackjack: JSON.stringify(blackjack)})

				if (calculateTotal(blackjack.hands.user) > 21 && blackjack.hands.user.includes(1)) {

					while (calculateTotal(blackjack.hands.user) > 21 && blackjack.hands.user.includes(1)) {

						for (let i = 0; i < blackjack.hands.user.length; i++) {

							if (blackjack.hands.user[i] === 1 && calculateTotal(blackjack.hands.user) > 21) {

								blackjack.hands.user[i] = 14

							}

						}

					}

				} else {

					await interaction.message.edit(` \`\`\`Dealer is showing: ${blackjack.hands.dealer[1]} \nYou are holding: ${blackjack.hands.user.toString(',')} \nTotal: ${calculateTotal(blackjack.hands.user)}\`\`\``)
					await interaction.deferUpdate()

				}
			}

			if (interaction.customId === 'blackjackUserStay') {
				// Stay Logic

				let user = await User.findOne({where: {username: interaction.user.username}});
				let blackjack = JSON.parse(user.blackjack)
				await user.update({blackjack: JSON.stringify(blackjack)})

				while (calculateTotal(blackjack.hands.dealer) < calculateTotal() && calculateTotal(blackjack.hands.dealer) < 17) {
					
					let newCard = Math.floor(Math.random() * 13)
					blackjack.hands.dealer.push(newCard)
				}
				if (calculateTotal(blackjack.hands.dealer) > 21) {

					await interaction.message.edit({content: `The House Has Gone Bust! (${calculateTotal(blackjack.hands.dealer)}). \n Points are awarded to you and game has reset!`, components: []})

				} else if (calculateTotal(blackjack.hands.dealer) === calculateTotal(blackjack.hands.user)) {

					await interaction.message.edit({content: `You (${calculateTotal(blackjack.hands.user)}) and the dealer (${calculateTotal(blackjack.hands.dealer)}) break even. Your game has been reset.`, components: []})

				} else if (calculateTotal(blackjack.hands.dealer) > calculateTotal(blackjack.hands.user)) {

					await interaction.message.edit({content: `The house (${calculateTotal(blackjack.hands.dealer)}) drew higher than you (${calculateTotal(blackjack.hands.user)}) without busting, you lose!`, components: []})

				}

				await user.update({blackjack: JSON.stringify(resetGame)})
				await interaction.deferUpdate()

			}

			// Plex Requests ---------
			if (interaction.customId === 'markComplete') {

				let channelId = '1125153614441238621'
				const channel = await client.channels.fetch(channelId)

				for (let i = 0; i < interaction.message.content.length - 1; i++) {
					let p1;
					if (interaction.message.content[i] === '*' && p1 === undefined) p1 = i
					if (p1 !== undefined) {
						film = await interaction.message.content.slice(p1)
					}
				}
				await interaction.message.delete()
				await channel.send(`${film} has been added to the Plex Server!`)
				await interaction.deferUpdate()
			}
			if (interaction.customId === 'markBad') {
				
				await interaction.message.delete()
			}
		} else if (interaction.isStringSelectMenu()) {
			return;
		}
	}
};