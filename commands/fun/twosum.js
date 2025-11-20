import { MessageFlags, SlashCommandBuilder } from "discord.js";
import {db} from '../../database/models/index.js';
const { User } = db;
export default {
  data: new SlashCommandBuilder()
    .setName("twosum")
    .setDescription("Check if any two integers add up to the target number")
    .addIntegerOption((option) =>
      option
        .setName("integer1")
        .setDescription("Enter your first integer")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("integer2")
        .setDescription("Enter your second integer")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("integer3")
        .setDescription("Enter your third integer")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("targetnumber")
        .setDescription("Enter your target number")
        .setRequired(true)
    ),

  async execute(interaction) {
    let intOne = interaction.options.getInteger("integer1");
    let intTwo = interaction.options.getInteger("integer2");
    let intThree = interaction.options.getInteger("integer3");
    let targetNum = interaction.options.getInteger("targetnumber");

    let intArray = [intOne, intTwo, intThree];
    let foundPair = false;
    let pair = [];

    //Two Sum Logic
    for (let i = 0; i < intArray.length; i++) {
      for (let j = i + 1; j < intArray.length; j++) {
        if (intArray[i] + intArray[j] === targetNum) {
          foundPair = true;
          pair = [intArray[i], intArray[j]];
          break;
        }
      }
      if (foundPair) break;
    }

    //TODO: Improve response formatting / Polish. Titles, all picks and target displayed.
    if (foundPair) {
      return interaction.reply(
        {content: `Yes! ${pair[0]} and ${pair[1]} add up to ${targetNum}.`, //flags: MessageFlags.Ephemeral
    });
    } else {
      return interaction.reply(
        {content: `No, there are no two integers that add up to ${targetNum}.`, //flags: MessageFlags.Ephemeral
    });
    }
}
}