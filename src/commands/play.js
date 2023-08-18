const { GuildMember, SlashCommandBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play a song in your channel!')
		.addStringOption((option) =>
			option
				.setName('link-or-query')
				.setDescription('The song you want to play')
				.setRequired(true),
		),
	async execute(interaction, player) {
		try {
			if (
				!(interaction.member instanceof GuildMember) ||
				!interaction.member.voice.channel
			) {
				return interaction.reply({
					content: 'You are not in a voice channel!',
					ephemeral: true,
				});
			}

			if (
				interaction.guild.members.me.voice.channelId &&
				interaction.member.voice.channelId !==
					interaction.guild.members.me.voice.channelId
			) {
				return interaction.reply({
					content: 'You are not in my voice channel!',
					ephemeral: true,
				});
			}

			await interaction.deferReply();

			const query = interaction.options.getString('link-or-query');
			const searchResult = await player
				.search(query, {
					requestedBy: interaction.user,
					searchEngine: QueryType.AUTO,
				})
				.catch((err) => console.log('err: ', err));
			if (!searchResult || !searchResult.tracks.length)
				return interaction.followUp({
					content: 'No results were found!',
				});

			const queue = await player.createQueue(interaction.guild, {
				ytdlOptions: {
					quality: 'highest',
					filter: 'audioonly',
					highWaterMark: 1 << 30,
					dlChunkSize: 0,
				},
				autoSelfDeaf: false,
				leaveOnEmptyCooldown: 18000,
				leaveOnEndCooldown: 18000,
				leaveOnEnd: false,
				leaveOnEmpty: false,
				metadata: interaction.channel,
			});

			try {
				if (!queue.connection)
					await queue.connect(interaction.member.voice.channel);
			} catch {
				player.deleteQueue(interaction.guildId);
				return interaction.followUp({
					content: 'Could not join your voice channel!',
				});
			}

			await interaction.followUp({
				content: `⏱ | Loading your ${
					searchResult.playlist ? 'playlist' : 'track'
				}...`,
			});
			searchResult.playlist
				? queue.addTracks(searchResult.tracks)
				: queue.addTrack(searchResult.tracks[0]);
			if (!queue.playing) await queue.play();
		} catch (error) {
			interaction.followUp({
				content:
					'There was an error trying to execute that command: ' +
					error.message,
			});
		}
	},
};
