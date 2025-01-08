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
                400: 'Marble',
                700: 'Copper',
                1000: 'Tin',
                1300: 'Iron',
                2600: 'Steel',
                3000: 'Titanium',
                3500: 'Silver',
                4000: 'Platinum',
                4100: 'Cobalt',
                5000: 'Diamond',
                6000: 'Private',
                8000: 'First Private',
                10000: 'Lieutenant',
                13000: 'First Liuetenant',
                16000: 'Corporal',
                18000: 'Lvl 1 Thug',
                20000: 'lvl 50 KingPin',
                22000: 'lvl 100 Boss',
                24000: 'Orichalcum Keyboard',
                26000: 'Mythril Keyboard',
                28000: 'Adamantium Keyboard',
                30000: 'Spectral Keyboard',
                33000: 'Tungsten Keyboard',
                36000: 'Voice of the People',
                46000: 'Professional Discord Moderator',
                60000: 'King',
                75000: 'Q!NG',
                100000: 'Grand Marshall',
                150000: 'Deity',
                180000: 'Elder God',
                190000: 'Time Honored Hero',
                250000: 'Him',
                500000: 'Himmer',
            }

                let total = user.trust + score
                if (total > 999999) return

            }
            
    )}
}