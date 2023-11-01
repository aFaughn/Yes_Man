const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('query_youtube_likes')
        // .setDescription('Provides the likes and dislikes of the provided youtube video.')
        .setDescription('[NOT IMPLEMENTED]')
        .addStringOption(option =>
            option.setName('id_link')
                .setDescription('Id or Link to the video')
                .setRequired(true)),
    async execute(interaction) {
        await interaction.reply(`This command is not yet implemented.`)
        // const args = await interaction.options.getString('id_link')
        // //https://www.youtube.com/watch?v=ULj1qno-LBk

        // let videoId;
        
        // if (args.slice(0,2) === 'www') {
        //     videoId =  args.slice(25, -1)
        // } if (args.slice(0,5) === 'https') {
        //     videoId =  args.slice(25, -1)
        // } if (args.length() === 11) {
        //     videoId = args
        // } else {
        //     interaction.reply('Invalid link or Id. (http not supported, use https)')
        // }

        // gapi.client.init({
        //     'apiKey' : gapi_api_key,
        //     'discoveryDocs' : ['https://people.googleapis.com/$discovery/rest'],
        //     // 'clientId' : 'oauthId.apps.googleusercontent.com',
        //     // 'scope' : 'profile'
        //   }).then(function() {
        //       const results = gapi.client.youtube.videos.list({
        //           "part": [
        //               "statistics"
        //             ],
        //             "id": [
        //               videoId
        //             ]
        //           })
        //           .then(function(response) {
        //               interaction.reply(`id: ${videoId} \n Likes: ${response.items[0].statistics.likeCount}`)
        //           },
        //           function(err) { console.log(err), interaction.reply("Something went wrong, see console.")});
            
        //   })
        // gapi.load('client', start)
    },
}