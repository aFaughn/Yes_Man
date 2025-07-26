import { SlashCommandBuilder } from "discord.js";

const bars = [
	"I'm movin' different.",
	"THIS SHIT AINT NOTHIN TO ME, MAN",
	"I'm a dog; I'm bitin' at the fart bubbles in the bath.",
	"Smoking that Whoopi Goldberg South Egyptian fur burger Deluxe Mega Millions scratcher skunk bubba kush.",
	"I'm on 12 Vicodins smoking scooby doo dick.",
	"They must have amnesia, they forgot that I'm HIM.",
	"I'm on them broward county tic-tacs.",
	"I left my Margielas in the Benz truck. I'll have to stunt on them next time.",
	"I don't give a fuck if I go blind, I don't NEED to see the price tag anyway.",
	"We smokin' filtered crack you stupid piece of shit. I'LL FUCKIN KILL YOU.",
	"Last guy who ran off on the pack got choked out by some Givenchy gloves. The last thing he ever saw was the price tag on them. He slowly faded into darkness, and I let the archangels take him.",
	"I'm movin' like French Montana. HEHH??",
	"Reach for my neck you'll get turned into an example.",
	"Tied the opps to the back of a Trackhawk and dragged them around the block for 5 hours.",
	"Opps wanted initiative, I blew up their entire quadrant.",
	"She dropped that ass on me at an egregarious angle, they thought I was Stephen Wallace.",
	"Top Shelf Za-Za disrupting my circadian rhythm.",
	"I was flippin' bricks for Mansa Musa before ya'll were even a type 1 civilization.",
	"My bitch look like David Hasselhoff",
	" Y'all gotta stop playing with me man I threw diamonds at the strip clubs under the great pyramids. I pushed a camel through the eye of a needle.",
	"Balled so hard they thought I was a fuckin' nut sack."
]

export default {
	data: new SlashCommandBuilder()
		.setName('dracula_flow')
		.setDescription('Prints a random Dracula Flow.'),
	async execute(interaction) {
		await interaction.reply(bars[Math.floor(Math.random() * bars.length)]);
	},
};