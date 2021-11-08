const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: 'play',
    description: 'Music! POGGIES',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send("You gotta be in a voice channel to get the party started, baby!");
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send("You don't have the right permissions!");
        if (!permissions.has('SPEAK')) return message.channel.send("You don't have the right permissions!");
        if (!args.length) return message.channel.send("You have to play something, dear.");

        const validURL = (str) => {
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if (!regex.test(str)) {
                return false;
            } else {
                return true;
            }
        }

        if (validURL(args[0])) {
            
            const connection = await joinVoiceChannel(
            {
                channelId: message.member.voice.channel,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            const stream = ytdl(args[0], { filter: 'audioonly' });

            connection.play(stream, { seek: 0, volume: 1 })
                .on('finish', () => {
                    voiceChannel.leave();
                    message.channel.send('leaving channel');
                });

            await message.reply(`:POGGIES: Now Playing ***Your Link!***`)

            return
        }

        
        const connection = await joinVoiceChannel(
        {
            channelId: message.member.voice.channel,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        });

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;

        }

        const video = await videoFinder(args.join(' '));

        if (video) {
            const stream = ytdl(video.url, { filter: 'audioonly' });
            connection.play(stream, { seek: 0, volume: 1 })
                .on('finish', () => {
                    voiceChannel.leave();
                });

            await message.reply(`:thumbsup: Now Playing ***${video.title}***`)
        } else {
            message.channel.send('No video results found');
        }
    }
}