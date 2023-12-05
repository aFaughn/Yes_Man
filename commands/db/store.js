const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
const { User } = require('../../database/models')

const store = {
    'item 1': 1,
    'item 2': 0,
    'item 3': 999999999
}

const storeString = `__Yes-Man Store -- Emporium of Junk! -- Purchase now!__
- gambacap - Increase your gamba cap to the next tier - 
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

            let user = await User.findOne({ where: { username: interaction.user.username}})

            if (!user) {
                await interaction.reply('No user found, please run /create_new_user')
            } else {

                
                const item = interaction.options.getString('item')
                
                if (!item) {
                    await interaction.reply(storeString)
                } else {
                    if (item === 'item 1') {
                        await user.update({points: user.points - store[item]})
                        .then(user.save())
                        .then(interaction.reply(`Successfully purchased ${item} for ${store[item]} point(s)`))
                    }
                }
            }
	},
};