// Command: /wiki
// Returns a link to the KGA wiki

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wiki')
		.setDescription('Get a link to the wiki page'),
	async execute(interaction) {
		await interaction.reply('<https://kamigoroshi-aria.wikiru.jp/>');
	},
};