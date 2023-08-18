const {
	joinVoiceChannel,
	VoiceConnectionStatus,
} = require('@discordjs/voice');

const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Joins a voice channel!')
		.addChannelOption((option) =>
			option
				.setName('channel')
				.setDescription('the channel to join')
				.setRequired(true)
				.addChannelTypes(ChannelType.GuildVoice),
		),
	async execute(interaction) {
		const connection = joinVoiceChannel({
			channelId: interaction.member.voice.channel.id,
			guildId: interaction.member.guild.id,
			adapterCreator: interaction.member.guild.voiceAdapterCreator,
			selfDeaf: false,
		});

		connection.on(VoiceConnectionStatus.Disconnected, () => {
			console.log(
				'The connection has entered the Ready state - ready to play audio!',
			);
		});

		interaction.reply({ content: 'Joining' });
	},
};
