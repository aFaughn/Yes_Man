import { MessageFlags, SlashCommandBuilder } from "discord.js";
import { EmbedBuilder } from "discord.js";
export default {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Provides a link to the project repository.')
		.addStringOption((option) =>
			option
				.setName('category')
				.setDescription('The help category')
				.setRequired(true)
				.addChoices(
					{ name: 'Repo', value: 'repo' },
					{ name: 'Utility', value: 'utility' },
					{ name: 'Fun', value: 'fun' },
					{ name: 'Gambling', value: 'gambling' },
				),

		),


	async execute(interaction) {
		const category = interaction.options.getString('category')

		const repoHelp = new EmbedBuilder()
			.setColor(0x0099ff)
			.setTitle('Yes Man Repo Page')
			.setURL('https://github.com/aFaughn/Yes_Man.git')
			.setDescription('Click to be redirected to the Github repository for this project!')

		const utilityHelp = new EmbedBuilder()
			.setColor(0x0099ff)
			.setTitle('Utility Commands')
			.setDescription('Here is a list of all the utility commands')
			.addFields(
				{ name: '**/Plex_request**', value: 'Requests an item to be added to the media server.' },
				{ name: '**/check_points**', value: 'Checks your points balance.' },
				{ name: '**/leaderboards**', value: 'Displays the current points leaderboard.' },
				{ name: '/roll', value: 'Rolls a user-defined number of dice.' }
			)

		const funHelp = new EmbedBuilder()
			.setColor(0x0099ff)
			.setTitle('Fun Commands')
			.setDescription('Here is a list of all the non-gambling fun commands')
			.addFields(
				{ name: '**/citation**', value: 'Write your friends a mock citation.' },
				{ name: '**/dracula**', value: 'Responds with a random quote from the Dracula Flow YouTube series.' },
				{ name: '**/getpoints**', value: 'Gives you 100 points if your balance is 0.' },
				{ name: 'fishing', value: 'Go fishing to earn XP!' },
				{ name: 'maxwell', value: 'meow' },
				{ name: 'pokeinfo', value: 'Get information about your favorite Pokemon!' }
			)

		const gambleHelp = new EmbedBuilder()
			.setColor(0x0099ff)
			.setTitle('Gambling Commands')
			.setDescription('Here\'s all of the ways that you can gamble your points and hit it big!\n...or lose it all.')
			.addFields(
				{ name: 'doubleornothing', value: 'Take a chance on doubling your wager!' },
				{ name: '/gamba', value: 'Spins a slot machine.' },
				{ name: 'lotto', value: 'Buys a lottery ticket.' },
			)


		if (category == 'repo') {

			await interaction.reply({ embeds: [repoHelp], flags: MessageFlags.Ephemeral })
		}
		else if (category == 'utility') {

			await interaction.reply({ embeds: [utilityHelp], flags: MessageFlags.Ephemeral })
		}
		else if (category == 'fun') {

			await interaction.reply({ embeds: [funHelp], flags: MessageFlags.Ephemeral })
		}
		else if (category == 'gambling') {
			await interaction.reply({ embeds: [gambleHelp], flags: MessageFlags.Ephemeral })
		}


	}

	// //.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })


	// .addFields(
	//     {   name: 'General Commands', value: `` },
	//     {   name: '', value: ''},
	//     {   name: 'Gambling', value: '/Blackjack\n/Slots\n/CoinFlip' }


	// )




	// await interaction.reply({ embeds: [helpEmbed] });
	// },
};