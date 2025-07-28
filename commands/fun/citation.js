import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default{
	data: new SlashCommandBuilder()
		.setName('citation')
		.setDescription('Issue a citation to a user who has been naughty!')
        .addStringOption(option =>
            option.setName('recipient')
            .setDescription('Name of the person recieving the citation')
            .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('reason')
            .setDescription('Reason this person is recieving a citation today.')
        )
        .addStringOption(option => 
            option.setName('fine_amnt')
            .setDescription('The amount of currency to fine this person for their trangressions (default: 100).')
        ),
	async execute(interaction) {
        let issuer = interaction.user.username
        let recipient = interaction.options.getString('recipient')
        let reason = interaction.options.getString('reason')
        let fine = interaction.options.getString('fine_amnt')
        fine === '' ? fine = '100' : fine 

        let embed = new EmbedBuilder()
        .setColor('#0066FF')
        .setTitle('--- OFFICIAL CITATION ---')
        .setDescription(`THIS IS AN OFFICIAL CITATION BY YES MAN. \n YOU WERE ISSUED THIS CITATION FOR COMMITTING A HEINOUS AND UNSPEAKABLE ACT. \n RECIPIENT IS REQUIRED TO PAY THE AMOUNT INDICATED IN NO LESS THAN THIRTY (30) DAYS OF ISSUE DATE \n FAILURE TO DO SO MAY RESULT IN FURTHER PENALTIES.`)
        .setTimestamp()
        .addFields(
            {name: 'CITATION ISSUER', value: issuer},
            {name: 'REASON FOR CITATION', value: reason},
            {name: 'RECIPIENT OF CITATION', value: `${recipient}`, inline: true},
            {name: 'FINE AMOUNT', value: `${fine}`},
        )
        .setFooter({ text: '2024 OFFICIAL YES MAN DOCUMENT PURSUANT TO YRS-12.24-c'})

        await interaction.reply({ embeds: [embed] })
	},
};