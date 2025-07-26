import { SlashCommandBuilder } from 'discord.js';
import ai from '../../config/ai.js';

export default {
    data: new SlashCommandBuilder()
        .setName('testaiprompt')
        .setDescription('Tests an AI prompt'),
    async execute(interaction) {

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: "Say 'Hello World!'",
        });
        await interaction.reply(`${response.text}`)

    },
};