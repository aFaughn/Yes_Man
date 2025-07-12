const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
const wait = require('node:timers/promises').setTimeout
const { User } = require('../../database/models')

let fishSizes = [
    'Tiny',
    'Small',
    'Young',
    'Adolescent',
    'Adult',
    'Large',
    'Big',
    'Huge',
    'Gargantuan',
    "Mother-of-all"
]

let fishTypes = {
    trash: [
        'Old boot',
        'Fast Food wrapper',
        'Broken glasses',
        'Discarded firearm',
        'Seaweed',
        'Driftwood',
        'Old Tire',
        'Car Battery',
        "Beer Bottle",
        "Mixtape",
    ],
    small : [
        'Shrimp',
        'Guppy',
        'Zebrafish',
        'Tetra',
        'Minnow',
        'Tiger Barb',
        'Betta',
        'Goldfish',
        'Tilapia',
        'Urchin',
        'Sea Cucumber',
    ],
    medium: [
        'Clown Fish',
        'Carp',
        'Bass',
        'Blue Gill',
        'Catfish',
        'Squid',
        'Sunfish',
        'Pike',
        'Koi',
        'Salmon',
        'Crab',
        "Remora",
        "Flounder",
    ],
    large: [
        'Tiger Shark',
        'Manta Ray',
        'Dolphin',
        'Oarfish',
        'Angler',
        'Beluga',
        'Blue Tang',
        'Great White Shark',
        'Narwhal',
        "Barricuda",
        "Sword-Fish",
        'Giant Squid',
        "Orca",
    ],
    legendary: [
        'Great White Whale',
        'Kraken',
        'Megalodon',
        "Cthulhu's 2nd Cousin Thrice Removed",
        'Unagi',
        'Creature of the Loch Ness',
        'Davy Jones',
        "Umibōzu",
    ]
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fish')
		.setDescription('Try to catch a fish'),
	async execute(interaction) {
        await interaction.deferReply()
        await wait(3_000)
        let roll        = Math.floor(Math.random() * 10001)
        let sizeMod     = Math.floor(Math.random() * 10001)
        let catMod      = 1
        let fishType    = ''
        const user      = await User.findOne({ where: { name: interaction.user.username}})
        const userXP    = await user.fishingXP

        /* 
        Max fishing skill is 100,000 XP
        Scoring guide

        Base: 10

        trash:     base x 0.01
        small:     base x 1.00
        medium:    base x 1.50
        large:     base x 2.50
        legendary: base x 5.00

        SizeMult
        Tiny: SizeClass x 1.00
        Small: SizeClass x 1.10
        Young: SC x 1.30
        Adolescent: SC x 1.50
        Adult: SC x 2.00
        Large: SC x 2.30
        Big: SC x 2.50
        Huge: SC x 2.75
        Gargantuan: SC x 3.00
        Mother-of-All: SC x 10.00
        */

        // Calculate size

        // Apply xp bonus to roll

        
        roll = roll + ((userXP / 10) / 2)

        switch (sizeMod) {
            case sizeMod < 2000:
                sizeMod = 0.01
                fishType = fishTypes.trash[Math.floor(Math.random() * fishTypes.trash.length)]

            case sizeMod >= 2000 && sizeMod < 4000:
                sizeMod = 1
                fishType = fishTypes.trash[Math.floor(Math.random() * fishTypes.small.length)]
                
            case sizeMod >= 4000 && sizeMod < 6000:
                sizeMod = 1.5
                fishType = fishTypes.trash[Math.floor(Math.random() * fishTypes.medium.length)]
                
            case sizeMod >= 8000 && sizeMod < 9999:
                sizeMod = 2.5
                fishType = fishTypes.trash[Math.floor(Math.random() * fishTypes.large.length)]

            case sizeMod > 9999:
                sizeMod = 5
                fishType = fishTypes.trash[Math.floor(Math.random() * fishTypes.legendary.length)]

            default:
                break;
        }
        

        switch (roll) {
            case roll < 1000:
                roll = fishSizes[Math.trunc(roll / 1000)]
                catMod = 1

            case roll <= 2000 && roll > 1000:
                roll = fishSizes[Math.trunc(roll / 1000)]
                catMod = 1.10

            case roll <= 3000 && roll > 2000:
                roll = fishSizes[Math.trunc(roll / 1000)]
                catMod = 1.30

            case roll <= 4000 && roll > 3000:
                roll = fishSizes[Math.trunc(roll / 1000)]
                catMod = 1.50

            case roll <= 5000 && roll > 4000:
                roll = fishSizes[Math.trunc(roll / 1000)]
                catMod = 2

            case roll <= 6000 && roll > 5000:
                roll = fishSizes[Math.trunc(roll / 1000)]
                catMod = 2.3

            case roll <= 7000 && roll > 6000:
                roll = fishSizes[Math.trunc(roll / 1000)]
                catMod = 2.5

            case roll <= 8000 && roll > 7000:
                roll = fishSizes[Math.trunc(roll / 1000)]
                catMod = 2.75

            case roll <= 9000 && roll > 8000:
                roll = fishSizes[Math.trunc(roll / 1000)]
                catMod = 3

            case roll > 9000:
                roll = fishSizes[Math.trunc(roll / 1000)]
                catMod = 10

        }

        let base = 10
        let xpGain = base * catMod * sizeMod

        await user.update({ fishingXP: userXP + xpGain})
        await db.session.add(user)
        await db.session.commit()

        await interaction.reply(`You caught a ${roll} ${fishType} that was worth ${xpGain}!`)

	},
};