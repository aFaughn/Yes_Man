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
            
            function AdjustRank(user, score) {

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
                    15500: ''

                }

            }
            
        })
    }
}