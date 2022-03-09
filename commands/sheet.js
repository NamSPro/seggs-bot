// Command: /sheet
// Returns a link to the general KGA spreadsheet

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sheet')
		.setDescription('Get a link to the info spreadsheet'),
	async execute(interaction) {
		await interaction.reply('<https://docs.google.com/spreadsheets/d/1y6EBqUxntzWsa0ZoBMEbHXwIsLCpMNChos3tMyYogco/edit#gid=300669334>');
	},
};