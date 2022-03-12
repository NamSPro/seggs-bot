// Command: /info
// Returns basic info about the bot

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Replies with my basic info'),
	async execute(interaction) {
		await interaction.reply('seggs-bot v0.0.2\nMade and maintained by NamSPro, with contributions from Miyo\nContact: NamSPro#2642 or [@aka_NamSPro](<https://twitter.com/aka_NamSPro>)');
	},
};