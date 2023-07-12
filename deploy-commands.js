require('dotenv').config()
const { REST, Routes } = require('discord.js');
const token = process.env.API_KEY
const clientId = process.env.CLIENT_ID
const guildId = process.env.GUILD_ID
