const { SlashCommandBuilder, InteractionCollector, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('doubleornothing')
		.setDescription('Double your money or cashout'),
	async execute(interaction) {
        // Create a new instance of Double or Nothing.
        


        const embed = {
            color: 0xff0000,
            title: 'Double or Nothing',
            author: {
                name: interaction.user.username,
                iconURL: 'https://i.imgur.com/zzsgannb.jpg' 
            },
            fields: [
                {
                    name: 'Current Payout',
                    value: 'Value',
                },
            ]
        }

        const DORDouble = new ButtonBuilder()
        .setCustomId('DORDouble')
        .setLabel('Double or Nothing!')
        .setStyle(ButtonStyle.Primary)

        const DORCashOut = new ButtonBuilder()
        .setCustomId('DORCashout')
        .setLabel('Cash Out')
        .setStyle(ButtonStyle.Secondary)

        const Row = new ActionRowBuilder()
        .addComponents(DORDouble, DORCashOut)

        interaction.reply({
            embeds: [embed],
            ephemeral: true,
            components: [Row]
        })
	},
};