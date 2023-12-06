const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
const { User } = require('../../database/models')

const store = {
    'gambacap 1': 1000,
    'gambacap 2': 5000,
    'gambacap 3': 10000,
    'gambacap 4': 20000,
    'gambacap 5': 40000,
    'gambacap 6': 80000,
    'gambacap 7': 150000,
    'gambacap 8': 300000,
    'gambacap 9': 750000,
    'gambacap 10': 1000000,
    'pointscap 1': 1000,
    'pointscap 2': 5000,
    'pointscap 3': 10000,
    'pointscap 4': 20000,
    'pointscap 5': 40000,
    'pointscap 6': 80000,
    'pointscap 7': 150000,
    'pointscap 8': 300000,
    'pointscap 9': 750000,
    'pointscap 10': 1000000,
    'prestige':100000000,
    'Renew One-Time': 1e+21
}

const storeString = `__Yes-Man Store -- Emporium of Junk! -- Purchase now!__
- *T* gambacap - Increase your gamba cap to the next tier
- *T* pointscap - Increase your points cap to the next tier 
- Renew One-Time - DOES NOT STACK renew a used one-time. - 999,999,999,999,999,999,999p

**Please take care to spell an item to purchase exactly as it appears in it's listing!*
When buying tiered Items (Marked with *T*) Make sure to include the tier you are purchasing. (e.g. /store gambacap 10)
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

            // Init user
            let user = await User.findOne({ where: { username: interaction.user.username}})

            // Error handling for no user
            if (!user) {
                await interaction.reply('No user found, please run /create_new_user')
            } else {

                
                const item = interaction.options.getString('item')
                
                if (!item) {

                    await interaction.reply(storeString)

                } else if (item === 'Renew One-Time') {

                    await interaction.reply('Nice try.')

                } else {

                    if (store[item] !== undefined) {
                        await user.update({points: user.points - store[item]})
                        .then(user.save())
                        .then(interaction.reply(`Successfully purchased ${item} for ${store[item]} point(s)`))
                    }

                }
            }
	},
};