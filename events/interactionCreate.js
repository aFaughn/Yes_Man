const { Events } = require('discord.js');
const { User } = require("../database/models");
const blackjack = require('../commands/fun/blackjack');
let film;

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
				const newCard = Math.floor(Math.random() * 13)
				let user = await User.findOne({where: {username: interaction.user.username}});
				let blackjack = JSON.parse(user.blackjack)
				blackjack.hands.user.push(newCard)
				await user.update({blackjack: JSON.stringify(blackjack)})
				usertotal = blackjack.hands.user.reduce((accum, cur) => accum += cur)
				if (usertotal > 21) {
					const game = {
						wager: 0,
						gameState: 0,
						hands: {
							dealer: [],
							user: [],
						}
					}
						await user.update({blackjack: JSON.stringify(game)})
						await interaction.message.edit({ content: `\`Sorry, you went over 21 and busted (${usertotal})! Your wager has been deducted and your game has been reset.\``, components: []})
						await interaction.deferUpdate()
				} else {
					await interaction.message.edit(` \`\`\`Dealer is showing: ${blackjack.hands.dealer[1]} \nYou are holding: ${blackjack.hands.user.toString(',')} \nTotal: ${usertotal}\`\`\``)
					await interaction.deferUpdate()
				}
			}

			if (interaction.customId === 'blackjackUserStay') {
				let user = await User.findOne({where: {username: interaction.user.username}});
				let blackjack = JSON.parse(user.blackjack)
				await user.update({blackjack: JSON.stringify(blackjack)})
				usertotal = blackjack.hands.user.reduce((accum, cur) => accum += cur)
				let dealertotal = blackjack.hands.dealer.reduce((accum, cur) => accum += cur)
				while (dealertotal < usertotal && dealertotal < 17) {
					
					let newCard = Math.floor(Math.random() * 13)
					blackjack.hands.dealer.push(newCard)
				}
				if (dealertotal > 21) {

					await interaction.message.edit({content: `The House Has Gone Bust! Points awarded to you and game reset!`, components: []})
					await interaction.deferUpdate()

				} else if (dealertotal === usertotal) {

					await interaction.message.edit({content: `You and the dealer break even. Your game has been reset.`, components: []})
					await interaction.deferUpdate()

				} else if (dealertotal > usertotal) {
					await interaction.message.edit({content: `The house drew higher than you without busting, you lose!`})
					await interaction.deferUpdate()
				}
			}

			// Plex Requests ---------
			if (interaction.customId === 'markComplete') {

				channelId = '1125153614441238621'
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