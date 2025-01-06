const { Events } = require('discord.js');
const { User } = require('../database/models')

let cache = []

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        const content = message.content
        const authorName = message.author.username
        const authorId = message.author.id
        const timestamp = message.createdTimestamp
        const channelId = message.channelId

        await User.findOne({where: { remoteId: authorId }})
        .then(user => {
            console.log(user.username, user.trust)

            let base = 3
            let lengthMult = 1.2
            let score = 0
            score = base + (lengthMult ** (content.length * 0.75))

            const ranks = {
                100: 'Dust',
                200: 'Soil',
                300: 'Stone',
                500: 'Marble',
                800: 'Copper',
                1200: 'Tin',
                1700: 'Iron',
                2200: 'Steel',
                3000: 'Titanium',
                4000: 'Silver',
                5000: 'Platinum',
                7000: 'Cobalt',
                8000: 'Diamond',
                9000: 'Private',
                10000: 'First Private',
                11000: 'Lieutenant',
                13000: 'First Liuetenant',
                14500: 'Corporal',
                15500: 'Lvl 1 Thug',
                17000: 'lvl 50 KingPin',
                19000: 'lvl 100 Boss',
                20000: 'Orichalcum Keyboard',
                22000: 'Mythril Keyboard',
                24000: 'Adamantium Keyboard',
                26000: 'Spectral Keyboard',
                28000: 'Tungsten Keyboard',
                30000: 'Voice of the People',
                33000: 'Professional Discord Moderator',
                35000: 'King',
                37000: 'Q!NG',
                40000: 'Grand Marshall',
                50000: 'Deity',
                70000: 'Elder God',
                100000: 'Time Honored Hero',
                200000: 'Him',
                999999: 'Himmer',
            }

                let total = user.trust + score
                if (total > 999999) return

            }
            
    )}
}