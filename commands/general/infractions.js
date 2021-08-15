const utils = require('../../utils/utils');
const { Command } = require('discord.js-commando');

module.exports = class AdminRolesCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'infractions',
            group: 'general',
            memberName: 'infractions',
            description: 'displays a users infractions',
            guildOnly: true,
            args: [
                {
                    key: 'user',
                    prompt: 'Please tag the user to check',
                    type: 'user',
                },

            ],
        });
    }

    // noinspection JSCheckFunctionSignatures
    async run(message, { user }) {
        const infractionsBites = await utils.query('SELECT COUNT(*) as Infractions \n' +
            'FROM PuppyActions \n' +
            'WHERE GuildID = \'' + message.guild.id + '\' \n' +
            'AND UserID = \'' + user.id + '\'' +
            'AND MessageContent LIKE \'%bites%\' ');
        const infractionsNips = await utils.query('SELECT COUNT(*) as Infractions \n' +
            'FROM PuppyActions \n' +
            'WHERE GuildID = \'' + message.guild.id + '\' \n' +
            'AND UserID = \'' + user.id + '\'' +
            'AND MessageContent LIKE \'%nips%\' ');
        const infractionsGrowls = await utils.query('SELECT COUNT(*) as Infractions \n' +
            'FROM PuppyActions \n' +
            'WHERE GuildID = \'' + message.guild.id + '\' \n' +
            'AND UserID = \'' + user.id + '\'' +
            'AND MessageContent LIKE \'%growls%\' ');
        const infractionsChomps = await utils.query('SELECT COUNT(*) as Infractions \n' +
            'FROM PuppyActions \n' +
            'WHERE GuildID = \'' + message.guild.id + '\' \n' +
            'AND UserID = \'' + user.id + '\'' +
            'AND MessageContent LIKE \'%ch%mps%\' ');
        return message.say('<@' + user + '> has ' + infractionsBites.recordset[0].Infractions + ' bites, '
            + infractionsNips.recordset[0].Infractions + ' nips, ' + infractionsChomps.recordset[0].Infractions + ' chomps, and ' + infractionsGrowls.recordset[0].Infractions + ' growls.');

    }
};
