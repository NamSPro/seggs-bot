const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const skillData = require('./skillData.json')

function capFirst(str) {
    return str[0].toUpperCase() + str.slice(1);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skills')
		.setDescription("Display a Diamiss' skills")
        .addStringOption(option =>
            option.setName('heroname')
                .setDescription('The name of the Diamiss to look up skills')
                .setRequired(true)
                .addChoice('Maki', 'maki')
                .addChoice('Minami', 'minami')),
	async execute(interaction) {
        const name = interaction.options.getString('heroname')
        const generalInfo = skillData[name]
        const skillCombo = skillData[name].combo
        const skillPassive = skillData[name].passive
        const skill1 = skillData[name].s1
        const skill2 = skillData[name].s2

        const embed = new MessageEmbed()
            .setColor('AQUA')
            .setThumbnail(generalInfo.iconURL)
            .setTitle(generalInfo.fullname + " Skills")
            .setDescription('All skills are at level 4, unless specified otherwise.')
            .addFields(
                { name: 'Combo Skill: ' + skillCombo.name, value: '**' + skillCombo.specifics + '**\n' + skillCombo.description },
                { name: 'Passive: ' + skillPassive.name, value: skillPassive.description },
                { name: 'Skill 1: ' + skill1.name, value: '**' + skill1.specifics + '**\n' + skill1.description },
                { name: 'Skill 2: ' + skill2.name, value: '**' + skill2.specifics + '**\n' + skill2.description },
            )
            .setFooter({ text: 'Seggs Bot v0.0.1, by NamSPro and Miyo' })
		await interaction.reply({ embeds: [embed] })
	},
};