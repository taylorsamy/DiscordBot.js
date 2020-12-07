const { Command } = require('discord.js-commando');
const treasureUtils = require('../../utils/treasureHunt');
module.exports = class GiveTreasureCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'givetreasure',
            group: 'treasure',
            memberName: 'givetreasure',
            description: 'Gives a user treasure',
            guildOnly: true,
            args: [
                {
                    key: 'user',
                    prompt: 'Select a user to give treasure to',
                    type: 'user',
                },
                {
                    key: 'num',
                    prompt: 'Number of treasure to give',
                    type: 'integer',
                },
            ],
        });
    }

    async run(message, { user, num }) {


        const treasure = await treasureUtils.giveTreasure(message.guild.id, user, num);
        return message.say(user.tag + ' has ' + treasure + ' treasure');
    }
};
