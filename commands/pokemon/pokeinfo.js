const { SlashCommandBuilder, InteractionCollector, EmbedBuilder, channelLink } = require("discord.js");
const { Counter } = require("../../database/models");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pokeinfo')
		.setDescription('Grabs information about a specified pokemon')
        .addStringOption(option => 
            option.setName('pokemon_name')
            .setDescription('The name of the pokemon you want information on.')
            .setRequired(true)),
	async execute(interaction) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${interaction.options.getString('pokemon_name')}`)
        .then(response => response.status === 200 ? response.json() : response = {error: `Couldn't find a pokemon named ${interaction.options.getString('pokemon_name')}. Is it spelled correctly?`})
        .then(data => {
            if (data.error) {
                interaction.reply({content: data.error, ephemeral: true})
            } else {
                let pname = interaction.options.getString('pokemon_name')
                const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setURL(`https://bulbapedia.bulbagarden.net/wiki/${data.name}`)
                .setTitle(data.name)
                .setDescription(`TYPE: ${data.types[0].type.name}${ data.types[1] ? ` | ${data.types[1].type.name}` : '' } \n ABILITIES: ${data.abilities.map(entry => ' ' + entry.ability.name)}`)
                .setThumbnail(data.sprites.other['official-artwork'].front_default)
                .setTimestamp()
                .setAuthor({ name: `#${data.id}`, iconURL: data.sprites.front_default})
                .addFields(
                    {name: 'HP', value: `${data.stats[0].base_stat}`, inline: true },
                    {name: 'ATK', value: `${data.stats[1].base_stat}`, inline: true},
                    {name: 'DEF', value: `${data.stats[2].base_stat}`, inline: true},
                    {name: 'SP.ATK', value: `${data.stats[3].base_stat}`, inline: true},
                    {name: 'SP.DEF', value: `${data.stats[4].base_stat}`, inline: true},
                    {name: 'SPEED', value: `${data.stats[5].base_stat}`, inline: true},
                )
                .setFooter({ text: 'Powered by the PokeAPI', iconURL: 'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png'})

                
                interaction.reply({ embeds: [embed] })
            }
        })
	},
};