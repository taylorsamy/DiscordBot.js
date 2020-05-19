const { Command } = require('discord.js-commando');

module.exports = class jokeWarnCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'jokewarn',
			aliases: ['playwarn'],
			group: 'first',
			memberName: 'jokewarn',
			description: 'Gives the user a joke warning',
			guildOnly: true,
			args: [
				{
					key: 'member',
					prompt: 'What member would you like to jokingly warn?',
					type: 'member',
				},
			],

		});
	}

	hasPermission(message) {
		return message.member.roles.cache.some(r=>['Admin', 'Adminion'].includes(r.name));
	}

	run(message, { member }) {
		if (member.roles.cache.some(r=>['Admin', 'Adminion'].includes(r.name))) {
			return message.say(`The power invessted in ${member} is far greater than my own! Even as a joke, they can only be warned by a god!`);
		}
		return message.say(`By the power invested in my lollipop, I herby warn ${member}! Their punishment is to share ALL their candy!`);
	}
};