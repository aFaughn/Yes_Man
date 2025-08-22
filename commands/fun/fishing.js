import { SlashCommandBuilder } from "discord.js";
import { User } from '../../database/models/user.js'

let fishSizes = [
  "Tiny",
  "Small",
  "Young",
  "Adolescent",
  "Adult",
  "Large",
  "Big",
  "Huge",
  "Gargantuan",
  "Mother-of-all",
];

let fishTypes = {
  trash: [
    "Old boot",
    "Fast Food wrapper",
    "Broken glasses",
    "Discarded firearm",
    "Seaweed",
    "Driftwood",
    "Old Tire",
    "Car Battery",
    "Beer Bottle",
    "Mixtape",
  ],
  small: [
    "Shrimp",
    "Guppy",
    "Zebrafish",
    "Tetra",
    "Minnow",
    "Tiger Barb",
    "Betta",
    "Goldfish",
    "Tilapia",
    "Urchin",
    "Sea Cucumber",
  ],
  medium: [
    "Clown Fish",
    "Carp",
    "Bass",
    "Blue Gill",
    "Catfish",
    "Squid",
    "Sunfish",
    "Pike",
    "Koi",
    "Salmon",
    "Crab",
    "Remora",
    "Flounder",
  ],
  large: [
    "Tiger Shark",
    "Manta Ray",
    "Dolphin",
    "Oarfish",
    "Angler",
    "Beluga",
    "Blue Tang",
    "Great White Shark",
    "Narwhal",
    "Barricuda",
    "Sword-Fish",
    "Giant Squid",
    "Orca",
  ],
  legendary: [
    "Great White Whale",
    "Kraken",
    "Megalodon",
    "Cthulhu's 2nd Cousin Thrice Removed",
    "Unagi",
    "Creature of the Loch Ness",
    "Davy Jones",
    "Umibōzu",
  ],
};

const fisherRanks = [
    'Novice',
    'Apprentice',
    'Acquainted',
    'Adept',
    'Skilled',
    'Pro',
    'Expert',
    'Master',
    'King',
    "Neptune's Chosen"
]

export default {
	data: new SlashCommandBuilder()
		.setName('fish')
		.setDescription('Try to catch a fish'),
	async execute(interaction) {
        await interaction.deferReply()
        await setTimeout(() => {}, 1000)
        let initialRoll = Math.floor(Math.random() * 10001)
        let roll        = initialRoll
        let sizeMod     = Math.floor(Math.random() * 10001)
        let catMod      = 1
        let fishType    = ''
        const user      = await User.findOne({ where: { username: interaction.user.username}})
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

    roll = roll + userXP / 10 / 2;

    // Modifier for fish
    if (roll < 1000) {
      roll = fishSizes[0]; // Index 0 for 'Tiny'
      catMod = 1;
    } else if (roll <= 2000 && roll > 1000) {
      roll = fishSizes[1]; // Index 1 for 'Small'
      catMod = 2;
    } else if (roll <= 3000 && roll > 2000) {
      roll = fishSizes[2]; // Index 2 for 'Young'
      catMod = 2;
    } else if (roll <= 4000 && roll > 3000) {
      roll = fishSizes[3]; // Index 3 for 'Adolescent'
      catMod = 3.5;
    } else if (roll <= 5000 && roll > 4000) {
      roll = fishSizes[4]; // Index 4 for 'Adult'
      catMod = 4;
    } else if (roll <= 6000 && roll > 5000) {
      roll = fishSizes[5]; // Index 5 for 'Large'
      catMod = 6;
    } else if (roll <= 7000 && roll > 6000) {
      roll = fishSizes[6]; // Index 6 for 'Big'
      catMod = 8;
    } else if (roll <= 8000 && roll > 7000) {
      roll = fishSizes[7]; // Index 7 for 'Huge'
      catMod = 10;
    } else if (roll <= 9000 && roll > 8000) {
      roll = fishSizes[8]; // Index 8 for 'Gargantuan'
      catMod = 15;
    } else if (roll > 9000) {
      roll = fishSizes[9]; // Index 9 for 'Mother-of-all'
      catMod = 20;
    }

    // Calculate fish type
    if (sizeMod < 2000) {
      sizeMod = 0.01;
      roll = "";
      fishType =
        fishTypes.trash[Math.floor(Math.random() * fishTypes.trash.length)];
    } else if (sizeMod >= 2000 && sizeMod < 4000) {
      sizeMod = 1.3;
      fishType =
        fishTypes.small[Math.floor(Math.random() * fishTypes.small.length)];
    } else if (sizeMod >= 4000 && sizeMod < 6000) {
      // Changed 8000 to 6000 based on your original intention
      sizeMod = 1.8;
      fishType =
        fishTypes.medium[Math.floor(Math.random() * fishTypes.medium.length)];
    } else if (sizeMod >= 6000 && sizeMod < 9975) {
      sizeMod = 3;
      fishType =
        fishTypes.large[Math.floor(Math.random() * fishTypes.large.length)];
    } else if (sizeMod >= 9975) {
      // Adjusted from > 9999
      sizeMod = 6;
      fishType =
        fishTypes.legendary[
          Math.floor(Math.random() * fishTypes.legendary.length)
        ]; // Corrected array
    }
    if (initialRoll === 10000) {
      catMod = 15;
      sizeMod = 10;
      roll = fishSizes[9];
      fishType =
        fishTypes.legendary[
          Math.floor(Math.random() * fishTypes.legendary.length)
        ];
    }

    let base = 15;
    let xpGain = base * catMod * sizeMod;

    await user.update({ fishingXP: Math.round(user.fishingXP + xpGain) });

    await interaction.editReply(
      `🎣 You caught a${
        roll[0] === "A" ? "n" : ""
      } ${roll} ${fishType} that gave ${xpGain} xp.\n🧠Total XP: ${await user.fishingXP}\n🎖️Rank: ${
        fisherRanks[Math.trunc(user.fishingXP / 10000)]
      } Angler \n🚀Rank ${Math.trunc(user.fishingXP / 10000)} / 10`
    );
  },
};
