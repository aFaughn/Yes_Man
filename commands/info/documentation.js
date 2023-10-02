const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

const bigNastyString = 
```
Ccrouse14 Bot Commands v.01 (last updated: 10/2/23) \n 
\n
Unless specified, commands have no additional parameters. \n
\n
--- Counters ---- \n 
/carter_barely \n
/mom \n
\n
--- Database --- \n
/createNewUser -- params: (no args: create new user based on sending user || name, datejoined (mm:dd:yy)(optional)) \n
\n
--- Fun --- \n
/ccrouse14 \n
/hello \n
\n
--- Info --- \n
/documentation \n
/server \n
/user \n
```

module.exports = {
	data: new SlashCommandBuilder()
		.setName('docs')
		.setDescription('Prints all commands, usage, and parameters.'),
	async execute(interaction) {
		await interaction.reply(bigNastyString);
	},
};