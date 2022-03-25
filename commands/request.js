const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('request')
		.setDescription('Request features for the bot!')
		.addStringOption(option =>
			option.setName('request')
				.setDescription('the request you wish to make')
				.setRequired(true)),
	async execute(interaction) {
		await interaction.reply({ content: 'Request sent!', ephemeral: true  });
	},
};