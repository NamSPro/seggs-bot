// Command: /sheet
// Returns a link to the general KGA spreadsheet

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sheet')
		.setDescription('Get a link to various spreadsheets'),
	async execute(interaction) {
		await interaction.deferReply();

		const buttonRow = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setLabel('KGA Main Infos')
					.setURL('https://docs.google.com/spreadsheets/d/1y6EBqUxntzWsa0ZoBMEbHXwIsLCpMNChos3tMyYogco/edit#gid=300669334')
			)
			.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setLabel('KR to KGA Infos')
					.setURL('https://docs.google.com/spreadsheets/d/16t0cvTTSS_O9w0tm8cSPuShkvN__qQ1pcO2iNLV-Mx0/edit#gid=656576501')
			);
		
		await interaction.editReply({ content: 'Below are some useful spreadsheets:', components: [buttonRow] });
	},
};