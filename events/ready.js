const { Events, ActivityType } = require('discord.js');
const { User, Guild, Config } = require('../database/models');
const apiKey = process.env.NASA_API_KEY

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {

		// Acknowledge Bot Ready
		console.log(`Bot Logged in as ${client.user.tag}`);
		await client.guilds.fetch()
		.then(guilds => guilds.forEach(guild => console.log(`Connected to: ${guild.name}, id: ${guild.id}`)))

		// Adds status flavor text
		client.user.setPresence({
			activities: [{
				name: 'for commands. 😀',
				type: ActivityType.Watching,
			}],
			status: 'online'
		});

		// NASA APOD
		try {
			setInterval(async () => {
				const apod = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`, {
					method: "GET",
				})
				.then(response => response.json())
				.then(data => {
					client.guilds.fetch()
					.then(guilds => guilds.forEach(guild => {
						const config = Config.findOne({where: { guildId: guild.id }})
						const channel = client.channels.fetch(config.APODChannel)
						channel.send(`Nasa Astronomy Picture Of The Day \n**${data.title}** \n${data.url} \n${data.explanation}`)
					}))
				})
			}, 86400000)
			// WARNING!!!! SETTING THE TIMEOUT TOO SHORT WILL RESULT IN REVOCATION OF YOUR API KEY!!!!!
			// GENERALLY IT IS BEST TO NOT QUERY PUBLIC API'S MORE THAN 120 TIMES / MONTH
		} catch (error) {
			console.log(error)
		}

		// Create user entries for everyone in the server if there are no entries.
		const dbCheck = await User.findAll({logging: false})
		if (!dbCheck[0]) {
			await client.guilds.cache
			// Grab every guild this server is a member of
			.then(guilds => {
				guilds.forEach(guild => {

					//Create guild entry in DB
					try {
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
									Config.create({
										guildId: `${guild.id}`,
									})
								}
							})
						})
					} catch (e) {
						console.log(e)
					}
				
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
							}

						})
					}))
				})
			})	
		}
	},
};