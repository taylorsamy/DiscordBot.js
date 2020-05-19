module.exports = {
	args: false,
	usage: '',
	name: 'ping',
	description: 'Ping!',
	guildonly: false,
	cooldown: 5,
	aliases: ['pong'],
	execute(message, args) {
		message.channel.send('pong');
	},
};