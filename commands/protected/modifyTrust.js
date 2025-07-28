import { SlashCommandBuilder, InteractionCollector } from "discord.js";
import User from "../../database/models/user.js";

export default {
	data: new SlashCommandBuilder()
		.setName('modify_trust')
		.setDescription("[Protected] Modify a user's trust.")
        .addIntegerOption(option => 
            option.setName('number')
            .setDescription('Whole number +/-')
            .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('username')
            .setDescription('User who you want to modify')
            .setRequired(true)
        )
        ,
	async execute(interaction) {
        
        const comUser       = interaction.user.username // string / undefined
        const target        = interaction.options.getString('username') // string / undefined
        const mod           = Math.trunc(interaction.options.getInteger('number')) // integer / undefined
        const guildOwner    = await interaction.guild.fetchOwner() // User Obj / undefined\
        const authorized    = comUser === guildOwner.user.username //Bool
        const targetEntry   = await User.findOne({ where: {username: target}}) // User obj / undefined

        if (authorized && targetEntry) {
            try {
                await targetEntry.update({ trust: targetEntry.trust + mod})
                await interaction.reply({ content: `Successfully updated ${target}'s trust. New Trust: ${targetEntry.trust}`, ephemeral: true})
            } catch (e) {
                await interaction.reply({ content: "Whoops, something went wrong. Try again?", ephemeral: true})
                console.log('------START ERROR------- \nsrc: commands/protected/modifyTrust.js \n', e, '\n----------END ERROR-------')
            }
        }
	},
};