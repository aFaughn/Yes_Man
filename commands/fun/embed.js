const { SlashCommandBuilder, InteractionCollector, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed_test')
		.setDescription('Prints an embed object.'),
	async execute(interaction) {
        
        const embed = new EmbedBuilder()
        .setColor('#2299ff')
        .setTitle('This is an Embed')
        // .setURL('https://google.com')
        // .setAuthor({name: 'Yes Man', iconURL: 'https://i.imgur.com/fjW7zPB.png', url:'https://google.com'})
        .setDescription('Description')
        // .setThumbnail('https://i.imgur.com/fjW7zPB.png')
        // .addFields(
        //     { name: 'Regular field title', value: 'Some value here' },
        //     { name: '\u200B', value: '\u200B' },
        //     { name: 'Inline field title', value: 'Some value here', inline: true },
        //     { name: 'Inline field title', value: 'Some value here', inline: true },
        // )
        // .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	    // .setImage('https://i.imgur.com/fjW7zPB.png')
	    // .setTimestamp()
	    // .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

       await interaction.reply({ embeds: [embed] })
	},
};