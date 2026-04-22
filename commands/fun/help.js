import { SlashCommandBuilder } from "discord.js";
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

    

	if (category == 'repo'){

    await interaction.reply({   embeds: [repoHelp]})

    }}
    
    
    
        
	
	// //.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })


    // .addFields(
    //     {   name: 'General Commands', value: `` },
    //     {   name: '', value: ''},
    //     {   name: 'Gambling', value: '/Blackjack\n/Slots\n/CoinFlip' }

        
    // )




    // await interaction.reply({ embeds: [helpEmbed] });
	// },
};