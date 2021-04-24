const { Command } = require('discord.js-commando');
const utils = require('../../utils/utils');
module.exports = class AdminRolesCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'reminder',
            group: 'admin',
            memberName: 'reminder',
            description: 'Reminds users about something',
            guildOnly: true,
            ownerOnly: true,
            args: [
                {
                    key: 'channel',
                    prompt: 'Channel to remind in',
                    type: 'channel',
                },
                {
                    key: 'remindMessage',
                    prompt: 'Message to say',
                    type: 'string',
                },
                {
                    key: 'date',
                    prompt: 'Date to remind people: YYYY MM DD HH:MM \n time must be in 24 hour time',
                    type: 'string',
                },


            ],
        });
    }

    // noinspection JSCheckFunctionSignatures
    async run(message, { channel, date, remindMessage }) {

        if (!utils.isModerator(message.member)) {
            return message.say('Sorry ' + message.member.displayName + ' , you need to be a moderator or above to use this command');
        }

        const d = new Date(date)
            .toLocaleString('en-US', { timeZone: 'America/Edmonton' })
            .replace(',', '');
        await utils.query('INSERT INTO Reminders (GuildID, UserID, RemindDate, Message, Channel)' +
            'VALUES (' + message.guild.id + ', ' + message.author.id + ',\'' + d + '\', \'' + remindMessage + '\', \'' + channel + '\')');

        await message.say('Reminder scheduled.');
        console.log(remindMessage);

        setTimeout(() => {
            return channel.send(remindMessage);
        }, new Date(d) - Date.now());

    }
};
