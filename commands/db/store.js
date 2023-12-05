const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

const purchase = async (cost, user) => {
    // TODO
}

const store = {
    'item 1': 1,
    'item 2': 0,
    'item 3': 999999999
}

const storeString = `__Yes-Man Store -- Emporium of Junk! -- Purchase now!__
- item 1 - 1 point
- item 2 - 0 points
- item 3 - [SALE] - 999,999,999 points

**Please take care to spell an item to purchase exactly as it appears in it's listing!*
`

module.exports = {
	data: new SlashCommandBuilder()
		.setName('store')
		.setDescription("Display's purchaseable items using points")
        .addStringOption(option => 
            option.setName('item')
                .setDescription('Items No. / List')
                .setRequired(false)),
	async execute(interaction) {
        const { client } = interaction
        
        const item = interaction.options.getString('item')

        if (!item) {
            await interaction.reply(storeString)
        } else {

        }
	},
};