const { Events } = require('discord.js');
const apiKey = process.env.NASA_API_KEY
const { nasaAPODChannel } = require('../package.json')

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Bot Logged in as ${client.user.tag}`);

		const apod = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`, {
			method: "GET",
		})
		.then(response => response.data)

		const channel = await client.channels.fetch(nasaAPODChannel)
		channel.send()



	},
};