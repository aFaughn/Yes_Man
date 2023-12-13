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
- gambacap - Increase your gamba cap to the next tier
- pointscap - Increase your points cap to the next tier 
- Prestige - Wipe your points and upgrades and progress 1 prestige tier.
- Renew One-Time - DOES NOT STACK renew a used one-time. - 999,999,999,999,999,999,999p

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

            // Init user
            let user = await User.findOne({ where: { username: interaction.user.username}})
            const inventory = await user.inventory.JSON()
            const upgrades = await user.inventory.upgrades

            // Error handling for no user
            if (!user) {
                await interaction.reply('No user found, please run /create_new_user')
            } else {

                
                const item = interaction.options.getString('item')
                
                // Auto-Complete would be a nice feature to add here
                if (!item) {

                    await interaction.reply(storeString)

                } else if (item === 'Renew One-Time') {

                    await interaction.reply('Nice try.')

                } else {
                    //Purchase logic

                    
                    if (store[item] ===  'gambacap') {

                        inventory.upgrades.pointscap += 1
                        await user.update({points: await user.points - store[`gambacap ${inventory.upgrades.gambacap + 1}`]})
                        await user.update({ inventory: await inventory})

                    } else if (store[item] === 'pointscap') {

                        inventory.upgrades.pointscap += 1
                        await user.update({points: await user.points - store[`pointscap ${inventory.upgrades.pointscap + 1}`]})
                        await user.update({ inventory: inventory})

                    } else if (store[item] === 'prestige') {

                        inventory.upgrades.pointscap = 0
                        inventory.upgrades.gambacap = 0
                        await user.update({points: await user.points - store[item]})
                        await user.update({ inventory: inventory})

                    }
                    

                }
            }
	},
};