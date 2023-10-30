const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('query_youtube_likes')
        .setDescription('Provides the likes and dislikes of the provided youtube video.')
        .addStringOption(option =>
            option.setName('id_link')
                .setDescription('Id or Link to the video')
                .setRequired(true)),
    async execute(interaction) {
        // await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`)
        const args = await interaction.options.getString('id_link')
        //https://www.youtube.com/watch?v=ULj1qno-LBk

        let videoId;
        
        if (args.slice(0,2) === 'www') {
            videoId =  args.slice(25, -1)
        } if (args.slice(0,5) === 'https') {
            videoId =  args.slice(25, -1)
        } if (args.length() === 11) {
            videoId = args
        } else {
            interaction.reply('Invalid link or Id. (http not supported, use https)')
        }

    },
}