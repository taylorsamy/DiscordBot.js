const { Command } = require('discord.js-commando');
const treasureUtils = require('../../utils/treasureHunt');
module.exports = class StopHuntCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stophunt',
            group: 'treasure',
            memberName: 'stophunt',
            description: 'Stops the hunt',
            guildOnly: true,
        });
    }

    // noinspection JSCheckFunctionSignatures
    run(message) {
        treasureUtils.activeHunts.splice(treasureUtils.activeHunts.indexOf(message.guild.id), 1);
        console.log(treasureUtils.activeHunts);
        return message.say('The hunt has ended');
    }
};
