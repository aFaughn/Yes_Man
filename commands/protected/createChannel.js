const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
const { User } = require("../../database/models");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create_text_channel')
		.setDescription('Create a new text channel')
        .addStringOption(option =>
            option.setName('channel_name')
            .setDescription('The name of the newly created channel')
            .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('category')
            .setDescription('The category for the channel. Default: General')
            .setRequired(false)
        )
        ,
	async execute(interaction) {
        // Grab user who ran the command
		await User.findAll({where: {username: interaction.user.username}})
		.then((data) => {
			if (!data[0]) {
				interaction.reply('⚠ No user found!')
			} else {
                const user = data[0]
				if (user.trust >= 100) {

                    interaction.reply("You sure are allowed to create a message. Unfortunately, this hasn't been implemented yet!")

                }

			}
		})
	},
};