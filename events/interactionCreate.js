const { Events } = require('discord.js');
const { User } = require("../database/models");
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
				console.log('User has hit!')
				const newCard = Math.floor(Math.random() * 13)
				let user = await User.findOne({where: {username: interaction.user.username}});
				let blackjack = JSON.parse(user.blackjack)
				usertotal = blackjack.hands.user.reduce((accum, cur) => accum += cur)
				

			}

			if (interaction.customId === 'blackjackUserStay') {
				console.log('User Stayed!')
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