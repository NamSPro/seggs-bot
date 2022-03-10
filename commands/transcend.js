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
			.setThumbnail('attachment://' + name + '.jpg')
			.setFooter({ text: 'If you spot any mistake in the infos, give NamSPro#2642 or @aka_NamSPro a yell.' });
		let t3Info = '';
		for (const itr in transcendInfo) {
			if (itr === 't5') break;
			t3Info += '**' + transcendInfo[itr].name + '**\n[LIGHT] ' + transcendInfo[itr].light + '\n[DARK] ' + transcendInfo[itr].dark + '\n';
		}
		embedUniquePerks.addField('**T3 Perks**', t3Info);
		let t5Info = '[LIGHT] ' + transcendInfo.t5.light + '\n[DARK] ' + transcendInfo.t5.dark + '\n';
		embedUniquePerks.addField('\u200b', '**T5 Perks**\n' + t5Info);

		// T2 and below perks
		const embedGenericPerks = new MessageEmbed()
			.setTitle('Generic Transcendence Perks')
			.setColor('AQUA')
			.setFooter({ text: 'If you spot any mistake in the infos, give NamSPro#2642 or @aka_NamSPro a yell.' });
		let t1Info = '';
		for (const itr in data.genericTP.t1){
			t1Info += data.genericTP.t1[itr] + '\n';
		}
		embedGenericPerks.addField('**T1 Perks**', t1Info);
		let t2Info = '';
		for(const itr in data.genericTP.t2[generalInfo.class]) {
			t2Info += data.genericTP.t2[generalInfo.class][itr] + '\n';
		}
		embedGenericPerks.addField('**T2 Perks**', t2Info);

		// Buttons!
		const buttonRow = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('generic')
					.setLabel('Generic Perks')
					.setStyle('PRIMARY'),
			)
			.addComponents(
				new MessageButton()
					.setCustomId('specific')
					.setLabel(generalInfo.fullname + ' Perks')
					.setStyle('PRIMARY'),
			);
		
		// button event handler
		const filter = i => (i.customId === 'specific' || i.customId === 'generic');
		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });
		collector.on('collect', async i => {
			if (i.customId === 'specific') {
				await i.update({ embeds: [embedUniquePerks], components: [buttonRow] });
			}
			else {
				await i.update({ embeds: [embedGenericPerks], components: [buttonRow] });
			}
		});
		collector.on('end', collected => interaction.editReply({ content: 'Interaction timed out! Please reuse the command.', components: [] }));

		// Finally outputting
		await interaction.reply({ content: 'This interaction will timeout in 30s.', embeds: [embedUniquePerks], components: [buttonRow], files: ['./images/faces/' + name + '.jpg'] });
	},
};