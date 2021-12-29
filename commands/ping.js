module.exports = {
    name: 'ping',
    description: "check ping",
    execute(message, args, cmd, client, Discord) {
        message.channel.send(`🏓 Pong! Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }
}
