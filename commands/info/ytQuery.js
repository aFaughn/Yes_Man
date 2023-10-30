const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('query_youtube_likes')
        .setDescription('Provides the likes and dislikes of the provided youtube video.'),
    async execute(interaction) {
        // await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`)
        
    },
}