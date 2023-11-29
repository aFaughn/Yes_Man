const { Events } = require('discord.js');
const apiKey = process.env.NASA_API_KEY
const { nasaAPODChannel } = require('../package.json').config

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Bot Logged in as ${client.user.tag}`);
		const channel = await client.channels.fetch(nasaAPODChannel)

		for (let i = 0; i < 365; i++) {
			setTimeout(async () => {
				const apod = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`, {
					method: "GET",
				})
				.then(response => response.json())
				.then(data => {
					console.log(data)
					channel.send(`Nasa Astronomy Picture Of The Day \n**${data.title}** \n${data.url} \n${data.explanation}
					`)
				})
			}, 86400000)
		}

	},
};