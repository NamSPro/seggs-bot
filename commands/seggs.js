// Command: /seggs
// R18: Should be self explanatory

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('seggs')
		.setDescription('SEGGS!?'),
	async execute(interaction) {
		await interaction.reply({ content: 'https://cdn.discordapp.com/attachments/922550552183836712/951192117777162320/SPOILER_AnimatedTheo.gif', ephemeral: true });
	},
};