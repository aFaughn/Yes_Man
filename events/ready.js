import { Events, ActivityType, EmbedBuilder } from 'discord.js';

const apiKey = process.env.NASA_API_KEY

export default {
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
		// Welcome to callback hell.
		// Going to annotate this so reading this later is less painful.
		try {
			setInterval(async () => {
				// Set an interval so the APOD is fetched every 24hrs.
				// We only fetch this once, up here, outside of the each server func because 
				// if we spanned across a shit ton of servers we will spam the API and get banned.
				const apod = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`, {
					method: "GET",
				})
				// Fetch the APOD.
				.then(response => response.json())
				// Parse data from a JSON string to javascript.
				.then(data => {
					// Once the data has been recieved and parsed...
					client.guilds.fetch()
					// Fetch every guild the bot is a member of.
					.then(guilds => guilds.forEach(guild => {
						Config.findOne({where: { guildId: guild.id }})
						// Find the corresponding configuration settings for this guild.
						.then(config => {
							// Execute some logic based on what the APOD Channel value is inside config.
							if (config.dataValues.APODChannel === '') {
								// In this case, the user has yet to set an APOD channel so we'll just spit a console log and move on.
								console.log('Tried to push an APOD but the user has yet to declare an APOD Channel in their config.')
							} else {
								try {
									// In case discord is down and the fetch fails we don't want our entire app to crash so this is in a try block.
									client.channels.fetch(config.dataValues.APODChannel)
									// Load the APOD channel into memory by querying it by ID.
									.then(channel => {
										// We have all the data we need. Time to build the embed.

										// Sometimes APOD doesn't send an image but instead a video.
										// Discord embeds do not support nested embeds yet so we need to accomodate for that.
										if (data.url.substring(12, 23) === 'youtube.com') {
											let embed = new EmbedBuilder()
											.setColor('#0066ff')
											.setTitle("Nasa Astronomy Video Of the Day")
											.setDescription(data.explanation)
											.setFields({name: 'Image Title', value: data.title})

											// First send our embed with all our nice information for the user.
											channel.send({ embeds: [embed]})
											// Then send a regular messsage that discord can embed into the app normally.
											channel.send({ content: data.url})	

										} else {
											let embed = new EmbedBuilder()
											.setColor('#0066ff')
											.setTitle('NASA Astronomy Picture Of the Day')
											.setDescription(data.explanation)
											.setImage(data.url)
											.setFields({name: 'Image Title', value: data.title})
											// Finally, we send the APOD.
											channel.send({ embeds: [embed]})
										}
									})
								} catch (e) {
									// If you got here, something fucked up.
									console.log(`APOD ran into an error while trying to execute: \n`, e)
								}
							}
						})
					}))
				})
			}, 86400000)
			// WARNING!!!! SETTING THE TIMEOUT TOO SHORT WILL RESULT IN REVOCATION OF YOUR API KEY!!!!!
			// GENERALLY IT IS BEST TO NOT QUERY PUBLIC API'S MORE THAN 120 TIMES / MONTH
			// 86400000 == 24 Hours
		} catch (error) {
			console.log(error)
		}

		// Create user entries for everyone in the server if there are no entries.
		// If you recently added this bot to your server and users are not being registered, it's probably because you
		// didn't assign the correct intents (guilds, specifically).
		const dbCheck = await User.findAll({logging: false})
		if (!dbCheck[0]) {
			await client.guilds.fetch()
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