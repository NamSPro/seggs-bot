const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('seggs')
		.setDescription('SEGGS!?'),
	async execute(interaction) {
		await interaction.reply('https://http.cat/450.jpg');
	},
};