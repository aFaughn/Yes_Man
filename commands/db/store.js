const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

const purchase = async (cost, user) => {
    // TODO
}

const store = {
    1: 'placeholder',
    2: 'placeholder2'
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('store')
		.setDescription("Display's purchaseable items using points")
        .addStringOption(option => 
            option.setName('arguement')
                .setDescription('Items No. / List')
                .setRequired(false)),
	async execute(interaction) {
        const { client } = interaction
        const channel = await client.channels.fetch(interaction.channel)
        await channel.send(JSON.stringify(store))
	},
};