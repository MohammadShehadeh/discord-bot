# Thug Life Bot
###### A life in which one has to go through many struggles, like that of poor gangstas.

<a herf="https://discord.js.org/#/">
    <img src="https://camo.githubusercontent.com/d55d8a7f07a103454ebb77b653d9600ce27e011f78395d9713b432c8c011c76a/68747470733a2f2f646973636f72642e6a732e6f72672f7374617469632f6c6f676f2e737667" width="150" alt="discord.js" data-canonical-src="https://discord.js.org/static/logo.svg" style="max-width: 100%;">
</a>

------------

# General overview

```js
    client.on()

    client.on(Events.MessageCreate, async (message) => {
        const {
            author,
            content,
            channel,
            channelId,
            guildId,
        } = message;
    });

    ApplicationCommandPermissionsUpdate = 'applicationCommandPermissionsUpdate',
    ClientReady = 'ready',
    GuildCreate = 'guildCreate',
    GuildDelete = 'guildDelete',
    GuildUpdate = 'guildUpdate',
    GuildUnavailable = 'guildUnavailable',
    GuildMemberAdd = 'guildMemberAdd',
    GuildMemberRemove = 'guildMemberRemove',
    GuildMemberUpdate = 'guildMemberUpdate',
    GuildMemberAvailable = 'guildMemberAvailable',
    GuildMembersChunk = 'guildMembersChunk',
    GuildIntegrationsUpdate = 'guildIntegrationsUpdate',
    GuildRoleCreate = 'roleCreate',
    GuildRoleDelete = 'roleDelete',
    InviteCreate = 'inviteCreate',
    InviteDelete = 'inviteDelete',
    GuildRoleUpdate = 'roleUpdate',
    GuildEmojiCreate = 'emojiCreate',
    GuildEmojiDelete = 'emojiDelete',
    GuildEmojiUpdate = 'emojiUpdate',
    GuildBanAdd = 'guildBanAdd',
    GuildBanRemove = 'guildBanRemove',
    ChannelCreate = 'channelCreate',
    ChannelDelete = 'channelDelete',
    ChannelUpdate = 'channelUpdate',
    ChannelPinsUpdate = 'channelPinsUpdate',
    MessageCreate = 'messageCreate',
    MessageDelete = 'messageDelete',
    MessageUpdate = 'messageUpdate',
    MessageBulkDelete = 'messageDeleteBulk',
    MessageReactionAdd = 'messageReactionAdd',
    MessageReactionRemove = 'messageReactionRemove',
    MessageReactionRemoveAll = 'messageReactionRemoveAll',
    MessageReactionRemoveEmoji = 'messageReactionRemoveEmoji',
    ThreadCreate = 'threadCreate',
    ThreadDelete = 'threadDelete',
    ThreadUpdate = 'threadUpdate',
    ThreadListSync = 'threadListSync',
    ThreadMemberUpdate = 'threadMemberUpdate',
    ThreadMembersUpdate = 'threadMembersUpdate',
    UserUpdate = 'userUpdate',
    PresenceUpdate = 'presenceUpdate',
    VoiceServerUpdate = 'voiceServerUpdate',
    VoiceStateUpdate = 'voiceStateUpdate',
    TypingStart = 'typingStart',
    WebhooksUpdate = 'webhookUpdate',
    InteractionCreate = 'interactionCreate',
    Error = 'error',
    Warn = 'warn',
    Debug = 'debug',
    CacheSweep = 'cacheSweep',
    ShardDisconnect = 'shardDisconnect',
    ShardError = 'shardError',
    ShardReconnecting = 'shardReconnecting',
    ShardReady = 'shardReady',
    ShardResume = 'shardResume',
    Invalidated = 'invalidated',
    Raw = 'raw',
    StageInstanceCreate = 'stageInstanceCreate',
    StageInstanceUpdate = 'stageInstanceUpdate',
    StageInstanceDelete = 'stageInstanceDelete',
    GuildStickerCreate = 'stickerCreate',
    GuildStickerDelete = 'stickerDelete',
    GuildStickerUpdate = 'stickerUpdate',
    GuildScheduledEventCreate = 'guildScheduledEventCreate',
    GuildScheduledEventUpdate = 'guildScheduledEventUpdate',
    GuildScheduledEventDelete = 'guildScheduledEventDelete',
    GuildScheduledEventUserAdd = 'guildScheduledEventUserAdd',
    GuildScheduledEventUserRemove = 'guildScheduledEventUserRemove',
```

# How to send files

```js
message.channel.send({
	files: [''],
});
```

# How to send a file to specifiy channel

```js
client.channels.cache.get('CHANNEL_ID').send({files: [']});
```

# How to normal text message

```js
message.channel.send('');
```

# Get Guilds id

```js
const Guilds = client.guilds.cache.map((guild) => guild.id);
```

# Get Guilds id

```js
const appCommand = rest.put(
    // register all commands
    Routes.applicationCommands(CLIENT_ID), { body: commandsArray }
    // Test Mode: register all commands in specify guild
    Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commandsArray },
)
```
## Installation
 ```
nvm use
```
for more info: https://github.com/nvm-sh/nvm

------------
 ```
npm ci
```
## Development

To start development create `.env` file, for more info refer to `.env.example` then run:
```
npm run dev
```

## Production Run

To start production run create `.env` file, for more info refer to `.env.example` then run:
```
npm run start
```

## About
discord.js is a powerful Node.js module that allows you to easily interact with the Discord API.

- Object-oriented
- Predictable abstractions
- Performant
- 100% coverage of the Discord API
