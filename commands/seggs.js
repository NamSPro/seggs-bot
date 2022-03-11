// Command: /seggs
// R18: Should be self explanatory

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const data = require('./data.json');

const heroList = [];
for (const itr in data.list) {
	const diamissName = data.list[itr];
	heroList.push([ data[diamissName].fullname, diamissName ]);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('seggs')
		.setDescription('SEGGS!?')
		.addStringOption(option =>
			option.setName('heroname')
				.setDescription('The name of the Diamiss to get seggs')
				.setRequired(true)
				.addChoices(heroList)),
	async execute(interaction) {
		const name = interaction.options.getString('heroname');

		await interaction.deferReply({ ephemeral: true });
		await interaction.editReply({ files: ['./images/R18/' + name + '.gif'] });
	},
};