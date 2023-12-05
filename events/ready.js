const { Events } = require('discord.js');
const { User } = require('../database/models');
const apiKey = process.env.NASA_API_KEY
const { nasaAPODChannel, guildId } = require('../package.json').config

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {

		// Acknowledge Bot Ready
		console.log(`Bot Logged in as ${client.user.tag}`);

		// NASA APOD
		const channel = await client.channels.fetch(nasaAPODChannel)
			setInterval(async () => {
				const apod = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`, {
					method: "GET",
				})
				.then(response => response.json())
				.then(data => {
					console.log(data)
					channel.send(`Nasa Astronomy Picture Of The Day \n**${data.title}** \n${data.url} \n${data.explanation}`)
				})
			}, 86400000)

		// Create user entries for everyone in the server if there are no entries.
		const dbCheck = await User.findAll()
		if (!dbCheck[0]) {	
			const guild = await client.guilds.fetch(`${guildId}`)
			const members = await guild.members.fetch()
			.then(response => response.forEach(member => {
				if (!member.user.bot) {
					User.create({username: member.user.username})
					console.log(`Created DB entry for user ${member.user.username}`)
				}
			}))
		}
	},
};