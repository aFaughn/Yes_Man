import { Events } from 'discord.js';
import Config from '../database/models/config.js';

export default {
	name: Events.InteractionCreate,
	async execute(interaction) {
		const { client } = interaction;
		let film;

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

			// Plex Requests ---------
			if (interaction.customId === 'markComplete') {
				const config = await Config.findOne({
					where: {
						guildId: interaction.guildId
					}
				})
				const channel = await client.channels.fetch(config.plexChannel)

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

		// Modal
		if (interaction.isModalSubmit()) {

			// Config Modal
			if (interaction.customId === 'configModal') {

				const pcid = interaction.fields.getTextInputValue('plexChannelId');
				const poid = interaction.fields.getTextInputValue('plexOwnerId');
				const apodcid = interaction.fields.getTextInputValue('APODChannelId');
				const bmid = interaction.fields.getTextInputValue('BotModeratorId');

				let config = await Config.findOne({ where: { guildId: interaction.guildId}})
				
				try {

					await config.update({ plexChannel: pcid, plexOwner: poid, APODChannel: apodcid, botModerators: bmid })
					.then(await interaction.reply({content: `Successfully updated your configuration!`, ephemeral: true }))
				} catch (e) {
					await interaction.reply({content: `Something went wrong. Error: ${e}`, ephemeral: true})
				}
			}
		}

	}
};