// Command: /help
// Displays help

const { SlashCommandBuilder } = require('@discordjs/builders');
const data = require('./data.json');

let commands = '';
for (const itr in data.commandList) {
	commands += '**' + itr + '**: ' + data.commandList[itr] + '\n';
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get basic help'),
	async execute(interaction) {
		await interaction.reply('Available Commands:\n' + commands);
	},
};