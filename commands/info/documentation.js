const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

const bigNastyString = 
```
Ccrouse14 Bot Commands v.01 (last updated: 10/2/23) \n 
--- Counters ---- \n 

```

module.exports = {
	data: new SlashCommandBuilder()
		.setName('docs')
		.setDescription('Prints all commands, usage, and parameters.'),
	async execute(interaction) {
		await interaction.reply(bigNastyString);
	},
};