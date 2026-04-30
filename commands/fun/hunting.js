import { SlashCommandBuilder } from "discord.js";
import { db } from '../../database/models/index.js';
const { User } = db;

let Animals = {

    tiny: [
        "Spider",
        "Gnat",
        "Worm",
        "Mosquito",
        "Beetle"
    ],

    small: [
        "Rabbit",
        "Squirrel",
        "Dove",
        "Quail"
    ],

    medium: [
        "Turkey",
        "Bobcat",
        "Goose",
        "Deer",
        "Boar"
    ],

    large: [
        "Moose",
        "Bear",
        "Elk",

    ],

    trophy: [
        "Lion",
        "Polar Bear",
        "Panther",
        "Tiger"

    ]
}

export default {
    data: new SlashCommandBuilder()
        .setName("hunt")
        .setDescription("Go Hunting!"),
    async execute(interaction) {
        // await interaction.deferReply()
        await setTimeout(() => { }, 1000)
        await interaction.reply("This is still a work in progress! Check back soon.")
    }
}