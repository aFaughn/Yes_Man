const { SlashCommandBuilder, InteractionCollector } = require("discord.js");

const bars = [
	"I'm movin' different.",
	"THIS SHIT AINT NOTHIN TO ME, MAN",
	"I'm a dog; I'm bitin' at da fart bubbles in the bath.",
	"Smokin' that whoopie goldberg south egyption firburger deluxe megamillions scratcher skunk bubba kush.",
	"I'm on 12 Vicadins smoking scooby doo dick.",
	"They must have amnesia, they forgot that I'm HIM.",
	"I'm on them broward county tic-tacs.",
	"I left my margielas in the Benz truck. I'll have to stun on them next time.",
	"I don't give a fuck if I go blind, I don't NEED to see the price tag anyway.",
	"We smokin' filtered crack you stupid piece of shit. I'LL FUCKIN KILL YOU.",
	"Last guy who ran off on the pack got choked out by some Givenchy gloves. The last thing he ever saw was the price tag on them. He slowly faded into darkness, and I let the archangels take him.",
	"I'm movin' like French Montana. HEHH??",
	"Reach for my neck you'll get turned into an example.",
	"Tied the opps to the back of a track-hog and dragged them around the block for 5 hours.",
	"Opps wanted initiative, I blew up their entire quadrant.",
	"She dropped that ass on me at an egregious angle, they thought I was Stephen Wallace.",
	"Top Shelf Za-Za disrupting my circadian rhythm.",
	"I was flippin' bricks for Mansa Musa before ya'll were even a type 1 civilization.",
	"Balled so hard they thought I was a fuckin' nut sack."
]

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dracula_flow')
		.setDescription('Prints a random Dracula Flow.'),
	async execute(interaction) {
		await interaction.reply(bars[Math.floor(Math.random() * bars.length)]);
	},
};