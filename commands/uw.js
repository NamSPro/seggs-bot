const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const data = require('./data.json');

const heroList = [];
for (const itr in data.list) {
	const diamissName = data.list[itr];
	heroList.push([ data[diamissName].fullname, diamissName ]);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uw')
		.setDescription("Get a Diamiss' UW info")
		.addStringOption(option =>
            option.setName('heroname')
                .setDescription('The name of the Diamiss to get UW')
                .setRequired(true)
                .addChoices(heroList)),
	async execute(interaction) {
		const name = interaction.options.getString('heroname');
        const generalInfo = data[name];
		const uwInfo = generalInfo.ug.uw;
		let additionalInfo = '';
		for (const itr in uwInfo.extra) {
			additionalInfo += '(' + itr + '): ' + uwInfo.extra[itr] + '\n';
		}

		const embed = new MessageEmbed()
			.setColor('AQUA')
			.setTitle(generalInfo.fullname + ' UW')
			.setDescription(uwInfo.name)
			.addFields(
				{ name: '\u200b', value: uwInfo.description },
				{ name: '\u200b', value: additionalInfo },
			);

		await interaction.reply({ embeds: [embed] });
	},
};