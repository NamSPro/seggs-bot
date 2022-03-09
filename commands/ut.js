// Command: /ut
// Displays the selected Diamiss' UTs
// Have buttons to switch between single UT view and all UTs view

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
		.setName('ut')
		.setDescription("Get a Diamiss' UTs info")
		.addStringOption(option =>
            option.setName('heroname')
                .setDescription('The name of the Diamiss to get UTs')
                .setRequired(true)
                .addChoices(heroList)),
	async execute(interaction) {
		const name = interaction.options.getString('heroname');
        const generalInfo = data[name];
		const utInfo = generalInfo.ug.ut;

		// All UTs in one embed construction
		const embedAllUTs = new MessageEmbed()
			.setColor('AQUA')
			.setTitle(generalInfo.fullname + ' UTs')
			.setFooter({ text: 'Read the UT description or icon and CAREFULLY compare with the ingame UT.' });
		for (const itr in utInfo) {
			let additionalInfo = '';
			for (const itr2 in utInfo[itr].extra) {
				additionalInfo += '(' + itr2 + '): ' + utInfo[itr].extra[itr2] + '\n';
			}
			embedAllUTs.addFields(
				{ name: '**' + utInfo[itr].name + '**', value: utInfo[itr].description },
				{ name: additionalInfo, value: '\u200b' },
			);
		}

		// TODO: buttons, and specific UTs construction

		await interaction.reply({ embeds: [embedAllUTs] });
	},
};