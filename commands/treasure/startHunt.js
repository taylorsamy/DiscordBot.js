const { Command } = require('discord.js-commando');
const treasureUtils = require('../../utils/treasureHunt');
module.exports = class StartHuntCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'starthunt',
            group: 'treasure',
            memberName: 'starthunt',
            description: 'Starts the hunt',
            guildOnly: true,
        });
    }

    // noinspection JSCheckFunctionSignatures
    run(message) {
        treasureUtils.activeHunts.push(message.guild.id);
        return message.say('The hunt has begun');
    }
};
