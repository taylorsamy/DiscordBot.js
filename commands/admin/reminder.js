const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
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
            userPermissions: ['ADMINISTRATOR'],
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

        // const datetime = new Date(date);

        const d = new Date(date)
            .toLocaleString('en-US', { timeZone: 'America/Edmonton' })
            .replace(',', '');
        utils.query('INSERT INTO Reminders (GuildID, UserID, RemindDate, Message, Channel)' +
            'VALUES (' + message.guild.id + ', ' + message.author.id + ',\'' + d + '\', \'' + remindMessage + '\', \'' + channel + '\')');

        await message.say('Reminder scheduled.');
        console.log(remindMessage);

        setTimeout(() => {
            return channel.send(remindMessage);
        }, new Date(d) - Date.now());


    }
};
