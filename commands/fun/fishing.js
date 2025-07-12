const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
const wait = require('node:timers/promises').setTimeout
const { User } = require('../../database/models')

fishSizes = [
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

fishTypes = {
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
        const roll      = Math.floor(Math.random() * 10000)
        const sizeMod   = Math.floor(Math.random() * 10000)
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
            case sizeMod < 1000:
                sizeMod = 1
                
            case sizeMod >= 1000 && sizeMod < 2000:
                sizeMod = 1.10
                
            case sizeMod >= 2000 && sizeMod < 3000:
                sizeMod = 1.30
                
            case sizeMod >= 3000 && sizeMod < 4000:
                sizeMod = 1.50
                
            case sizeMod >= 4000 && sizeMod < 5000:
                sizeMod = 2.00
                
            case sizeMod >= 5000 && sizeMod < 6000:
                sizeMod = 2.30

            case sizeMod >= 6000 && sizeMod < 7000:
                sizeMod = 2.50

            case sizeMod >= 7000 && sizeMod < 8000:
                sizeMod = 2.75

            case sizeMod >= 8000 && sizeMod < 9500:
                sizeMod = 3.00

            case sizeMod >= 9500:
                sizeMod = 10

            default:
                break;
        }



	},
};