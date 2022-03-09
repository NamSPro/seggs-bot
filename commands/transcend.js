// Command: /transcend
// Display the selected Diamiss' Unique transcend nodes (T3 and above)
// The option to switch view to Generic/Class transcend nodes (T2 and below) is not supported yet

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
		.setName('transcend')
		.setDescription("Get a Diamiss' transcendence perks")
		.addStringOption(option =>
			option.setName('heroname')
				.setDescription('The name of the Diamiss to get UTs')
				.setRequired(true)
				.addChoices(heroList)),
	async execute(interaction) {
		const name = interaction.options.getString('heroname');
		const generalInfo = data[name];
		const transcendInfo = generalInfo.transcend;

		// T3 and up perks
		const embedUniquePerks = new MessageEmbed()
			.setTitle(generalInfo.fullname + ' Transcendence Perks')
			.setColor('AQUA')
			.setThumbnail(generalInfo.iconURL)
		let t3Info = '';
		for (const itr in transcendInfo) {
			if (itr === 't5') break;
			t3Info += '**' + transcendInfo[itr].name + '**\n[LIGHT] ' + transcendInfo[itr].light + '\n[DARK] ' + transcendInfo[itr].dark + '\n';
		}
		embedUniquePerks.addFields('**T3 Perks**', t3Info);
		let t5Info = '[LIGHT] ' + transcendInfo.t5.light + '\n[Dark] ' + transcendInfo.t5.dark + '\n';
		embedUniquePerks.addField('\u200b', '**T5 Perks**\n' + t5Info);

		await interaction.reply({ embeds: [embedUniquePerks] });
	},
};