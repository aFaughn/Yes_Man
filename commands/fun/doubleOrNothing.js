import { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, MessageFlags } from 'discord.js';
import {db} from '../../database/models/index.js';
const { User } = db;


export default {
	data: new SlashCommandBuilder()
		.setName('doubleornothing')
		.setDescription('Double your money or cashout')
        .addIntegerOption(option => 
            option.setName('wager')
            .setDescription('Amount to wager (minimum 100 points)')
            .setRequired(false)),
	async execute(interaction) {
        // Create a new instance of Double or Nothing.
        let wager = interaction.options.getInteger('wager');
        if (wager === null || wager === undefined)
            {
            wager = `${100}`;
            }  


        const embed = {
            color: 0xff0000,
            title: 'Double or Nothing',
            author: {
                name: interaction.user.username,
                iconURL: 'https://i.imgur.com/zzsgannb.jpg' 
            },
            fields: [
                {
                    name: 'Current Payout',
                    value: wager,
                },
            ]
        }

        const DORDouble = new ButtonBuilder()
        .setCustomId('DORDouble')
        .setLabel('Double or Nothing!')
        .setStyle(ButtonStyle.Primary)

        const DORCashOut = new ButtonBuilder()
        .setCustomId('DORCashout')
        .setLabel('Cash Out')
        .setStyle(ButtonStyle.Secondary)

        const Row = new ActionRowBuilder()
        .addComponents(DORDouble, DORCashOut)

        const user = await User.findOne({ where: { username: interaction.user.username } });
        if (user) {
            if (user.points < wager) {
                return interaction.reply({ content: `You do not have enough points. Current points: ${user.points}`, flags: MessageFlags.Ephemeral});
            }
            if (wager < 0) {
                return interaction.reply({ content: 'Wager must be greater than zero. Why did you try this?', flags: MessageFlags.Ephemeral});
            }

            await user.update({ points: user.points - wager });
        }

        await interaction.reply({
            embeds: [embed],
            components: [Row]
        })
	},
};