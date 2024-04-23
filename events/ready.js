const { Events } = require('discord.js');
const { User, Guild, Config } = require('../database/models');
const apiKey = process.env.NASA_API_KEY
const { nasaAPODChannel, guildId } = require('../package.json').config

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {

		// Acknowledge Bot Ready
		console.log(`Bot Logged in as ${client.user.tag}`);
		const activeGuilds = await client.guilds.fetch()
		.then(guilds => guilds.forEach(guild => console.log(`Connected to: ${guild.name}, id: ${guild.id}`)))
		

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
			await client.guilds.fetch()
			// Grab every guild this server is a member of
			.then(guilds => {

				guilds.forEach(guild => {

					//Create guild entry in DB
					let snowflake = client.guilds.fetch(guild.id)
					.then(snowflake => {
						Guild.findOne({where: { remoteId: guild.id}})
						.then(db => {
							if (!db) {
									Guild.create({
										remoteId: `${guild.id}`,
										name: guild.name,
										ownerId: `${snowflake.ownerId}`
									}),
									console.log(`Created DB entry for Guild: ${guild.name}`),
									Config.create({
										guildId: `${guild.id}`,
									}),
									console.log(`Created Config entry for Guild ${guild.name}`)
								}
							}
						)
						}
					)

					client.guilds.fetch(guild.id)
					.then(guild => guild.members.fetch()) // Then grab every user from every guild
					.then(members => members.forEach(member => {
						User.findOne({where: { username: member.user.username }})
						.then(db => {

							// Create entries for each user, skip duplicates and bots.
							if (!member.user.bot && !db) {
								User.create({
									username: member.user.username,
									remoteId: member.user.id,
								})
								console.log(`Created DB entry for user ${member.user.username}`)
							}

						})
					}))
				})
			})	
		}
	},
};