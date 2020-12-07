const { Command } = require('discord.js-commando');
const utils = require('../../utils/utils');
module.exports = class AdminRolesCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'adminroles',
            group: 'admin',
            memberName: 'adminroles',
            description: 'sets the moderator and admin roles',
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    key: 'moderator',
                    prompt: 'Moderator Role',
                    type: 'role',
                },
                {
                    key: 'admin',
                    prompt: 'Admin Role',
                    type: 'role',
                },
            ],
        });
    }

    // noinspection JSCheckFunctionSignatures
    async run(message, { moderator, admin }) {
        await utils.updateAdminRoles(message.guild, moderator, admin);
        return message.say('Moderator/Admin roles updated');

    }
};
