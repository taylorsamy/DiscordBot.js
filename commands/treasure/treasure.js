const { Command } = require('discord.js-commando');
const treasureUtils = require('../../utils/treasureHunt');
module.exports = class TreasureCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'treasure',
            group: 'treasure',
            memberName: 'treasure',
            description: 'Gets the treasure of a user',
            guildOnly: true,
        });
    }

    // noinspection JSCheckFunctionSignatures
    async run(message) {

        const treasure = await treasureUtils.getTreasure(message.guild.id, message.author.id);
        if (!treasure) {
            return message.say(message.author.tag + ' has no treasure');
        }
        return message.say(message.author.tag + ' has ' + treasure + ' treasure');
    }
};
