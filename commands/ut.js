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

		// All UTs in one embed
		const embedAllUTs = new MessageEmbed()
			.setColor('AQUA')
			.setTitle(generalInfo.fullname + ' UTs')
			.setFooter({ text: 'If you spot any mistake in the infos, give NamSPro#2642 or @aka_NamSPro a yell.' });
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

		// Passive UT embed
		const embedPassiveUT = new MessageEmbed()
			.setColor('AQUA')
			.setTitle(generalInfo.fullname + ' Passive UT')
			.setFooter({ text: 'Compare the image provided (if available) CAREFULLY against the ingame item.' });
		let additionalInfo = '';
		for (const itr in utInfo.utp.extra) {
			additionalInfo += '(' + itr + '): ' + utInfo.utp.extra[itr] + '\n';
		}
		embedPassiveUT.addFields(
			{ name: '**' + utInfo.utp.name + '**', value: utInfo.utp.description },
			{ name: additionalInfo, value: '\u200b' }
		);

		// UT1 embed
		const embedUT1 = new MessageEmbed()
			.setColor('AQUA')
			.setTitle(generalInfo.fullname + ' UT1')
			.setFooter({ text: 'Compare the image provided (if available) CAREFULLY against the ingame item.' });
		additionalInfo = '';
		for (const itr in utInfo.ut1.extra) {
			additionalInfo += '(' + itr + '): ' + utInfo.ut1.extra[itr] + '\n';
		}
		embedUT1.addFields(
			{ name: '**' + utInfo.ut1.name + '**', value: utInfo.ut1.description },
			{ name: additionalInfo, value: '\u200b' }
		);

		// UT2 embed
		const embedUT2 = new MessageEmbed()
			.setColor('AQUA')
			.setTitle(generalInfo.fullname + ' UT2')
			.setFooter({ text: 'Compare the image provided (if available) CAREFULLY against the ingame item.' });
		additionalInfo = '';
		for (const itr in utInfo.ut2.extra) {
			additionalInfo += '(' + itr + '): ' + utInfo.ut2.extra[itr] + '\n';
		}
		embedUT2.addFields(
			{ name: '**' + utInfo.ut2.name + '**', value: utInfo.ut2.description },
			{ name: additionalInfo, value: '\u200b' }
		);

		// Buttons
		const buttonRow = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('utp')
					.setLabel('Passive UT')
					.setStyle('PRIMARY'),
			)
			.addComponents(
				new MessageButton()
					.setCustomId('ut1')
					.setLabel('UT1')
					.setStyle('PRIMARY'),
			)
			.addComponents(
				new MessageButton()
					.setCustomId('ut2')
					.setLabel('UT2')
					.setStyle('PRIMARY'),
			)
			.addComponents(
				new MessageButton()
					.setCustomId('allUT')
					.setLabel(generalInfo.fullname + ' UTs')
					.setStyle('PRIMARY'),
			);

		// Button event handler
		const filter = i => (i.customId === 'utp' || i.customId === 'ut1' || i.customId === 'ut2' || i.customId === 'allUT');
		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });
		collector.on('collect', async i => {
			if (i.customId === 'utp') {
				await i.update({ embeds: [embedPassiveUT], components: [buttonRow] });
			}
			else if (i.customId === 'ut1') {
				await i.update({ embeds: [embedUT1], components: [buttonRow] });
			}
			else if (i.customId === 'ut2') {
				await i.update({ embeds: [embedUT2], components: [buttonRow] });
			}
			else {
				await i.update({ embeds: [embedAllUTs], components: [buttonRow] });
			}
		});
		collector.on('end', collected => interaction.editReply({ content: 'Interaction timed out! Please reuse the command.', components: [] }));

		await interaction.reply({ content: 'This interaction will timeout in 30s.', embeds: [embedAllUTs], components: [buttonRow] });
	},
};