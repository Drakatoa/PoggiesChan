module.exports = {
    name: 'mommy',
    aliases: ['mom', 'm'],
    description: "this makes u feel comforted",
    execute(message, args, cmd, client, Discord) {
        message.channel.send('Yes, dear?')
    }
}