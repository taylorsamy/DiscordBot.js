const { Command } = require('discord.js-commando');
const utils = require('../../utils/utils');
module.exports = class AdminRolesCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'query',
            group: 'admin',
            memberName: 'query',
            description: 'Directly queries the database',
            guildOnly: true,
            ownerOnly: true,
            args: [
                {
                    key: 'query',
                    prompt: 'T-SQL Query to run. Advanced users only.',
                    type: 'string',
                },

            ],
        });
    }

    // noinspection JSCheckFunctionSignatures
    async run(message, { query }) {
        const result = await utils.query(query);
        // console.log(result);
        return await message.say(JSON.stringify(result.recordset, null, 4));
    }
};
