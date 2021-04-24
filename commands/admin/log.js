const { Command } = require('discord.js-commando');
const utils = require('../../utils/utils');
module.exports = class AdminRolesCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'log',
            group: 'admin',
            memberName: 'log',
            description: 'Enable/disable logging',
            guildOnly: true,
            ownerOnly: true,
            args: [
                {
                    key: 'memberLogChannel',
                    prompt: 'Channel to log member events',
                    type: 'channel',
                    default: '',
                },
                {
                    key: 'actionLogChannel',
                    prompt: 'Channel to log actions',
                    type: 'channel',
                    default: '',
                },


            ],
        });
    }

    // noinspection JSCheckFunctionSignatures
    async run(message, { memberLogChannel, actionLogChannel }) {
        const moderator = await utils.isModerator(message.member);
        if (!moderator) {
            return message.say('Sorry ' + message.member.displayName + ' , you need to be a moderator or above to use this command');
        }

        memberLogChannel = memberLogChannel ? memberLogChannel : 'NULL';
        actionLogChannel = actionLogChannel ? actionLogChannel : 'NULL';


        // eslint-disable-next-line no-unused-vars
        const result = await utils.query('UPDATE Moderation ' +
            'SET memberLogChannel = ' + memberLogChannel + ', actionLogChannel = ' + actionLogChannel +
            ' WHERE guildID = ' + message.guild.id + ';');

        let response = memberLogChannel === 'NULL' ? 'Member logging disabled, ' : 'Member logging enabled in ' + memberLogChannel.name + ', ';
        response += actionLogChannel === 'NULL' ? 'Action logging disabled' : 'Action logging enabled in ' + actionLogChannel.name;
        return message.say(response);
    }
};
