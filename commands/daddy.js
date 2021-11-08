module.exports = {
    name: 'daddy',
    aliases: ['dad', 'd'],
    description: "dad went to the cigarette store :(",
    execute(message, args, cmd, client, Discord) {
        message.channel.send('I am not your father!')
    }
}