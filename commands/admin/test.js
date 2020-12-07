const { Command } = require('discord.js-commando');
const utils = require('../../utils/utils');
module.exports = class TestCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'test',
            group: 'admin',
            memberName: 'test',
            description: 'test',
            guildOnly: true,
        });
    }

    // noinspection JSCheckFunctionSignatures
    async run(message) {
        console.log(await utils.isModerator(message.member));


    }
};