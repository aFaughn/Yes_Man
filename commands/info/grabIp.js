require('dotenv').config()
const { SlashCommandBuilder } = require("discord.js");

const env = process.env


module.exports = {
	data: new SlashCommandBuilder()
		.setName('grab_external_ip')
		.setDescription('[WARNING][ADMIN ONLY] Grabs the bot\'s current public IP Address.'),
	async execute(interaction) {

        // !!! THIS COMMAND POSES MAJOR SECURITY RISKS !!!
        // !!! IT IS HIGHLY RECOMMENDED YOU ONLY ALLOW TRUSTED INDIVIDUALS ACCESS TO THIS COMMAND !!!
        // !!! PLEASE ONLY USE THIS COMMAND IF YOU ARE A DEVELOPER AND KNOW WHAT YOU ARE DOING !!!
        // !!! YOU HAVE BEEN WARNED !!!

        if (process.env.NODE_ENV === 'development') {

            // Define authorized users here
            let authorizedUsers  = {
                'alfman': 'alfman',
            }
            
            for (let user in authorizedUsers) {
                if (!interaction.user.username in authorizedUsers) {
                    interaction.reply('[403] Unauthorized')
                }
                    if (authorizedUsers[user] === interaction.user.username) {
                        let currentIP = await fetch('http://httpbin.org/ip')
                        .then(response => response.json())
                        .then(data => {
                            interaction.user.send(`Current IP: ${data.origin} \nDo not share this`)
                            interaction.reply('Command Recieved: Check your DM\'s')
                        })
                    }
                }
        } else if (process.env.NODE_ENV === 'production') {
            interaction.reply(`This command is disabled by default in production mode.`)
        }
	},
};