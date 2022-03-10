// Command: /skills
// Displays info on a Diamiss' skills

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
		.setName('skills')
		.setDescription("Display a Diamiss' skills")
		.addStringOption(option =>
			option.setName('heroname')
				.setDescription('The name of the Diamiss to look up skills')
				.setRequired(true)
				.addChoices(heroList)),
	async execute(interaction) {
		const name = interaction.options.getString('heroname');
		const generalInfo = data[name];
		const skillCombo = data[name].skill.combo;
		const skillPassive = data[name].skill.passive;
		const skill1 = data[name].skill.s1;
		const skill2 = data[name].skill.s2;

		const embed = new MessageEmbed()
			.setColor('AQUA')
			.setThumbnail('attachment://' + name + '.jpg')
			.setTitle(generalInfo.fullname + " Skills")
			.setDescription('All skills are at level 4, unless specified otherwise.')
			.addFields(
				{ name: 'Combo Skill: ' + skillCombo.name, value: '**' + skillCombo.specifics + '**\n' + skillCombo.description },
				{ name: 'Passive: ' + skillPassive.name, value: skillPassive.description },
				{ name: 'Skill 1: ' + skill1.name, value: '**' + skill1.specifics + '**\n' + skill1.description },
				{ name: 'Skill 2: ' + skill2.name, value: '**' + skill2.specifics + '**\n' + skill2.description },
			)
			.setFooter({ text: 'Seggs Bot v0.0.1, by NamSPro and Miyo' });

		await interaction.reply({ embeds: [embed], files: ['./images/faces/' + name + '.jpg'] });
	},
};