const { Command } = require('discord.js-commando');
const treasureUtils = require('../../utils/treasureHunt');
const utils = require('../../utils/utils');
module.exports = class TreasureRateCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'treasurerate',
            group: 'treasure',
            memberName: 'treasurerate',
            description: 'Sets the treasure rate',
            guildOnly: true,
            args: [
                {
                    key: 'trate',
                    prompt: 'Treasure will have a 1 in <num> chance to spawn',
                    type: 'integer',
                },
                {
                    key: 'srate',
                    prompt: 'When a treasure spawns, it will have a 1 in <num> chance to be special',
                    type: 'integer',
                },
            ],
        });
    }

    async run(message, { trate, srate }) {
        // TODO not allow duplicate entries

        if (utils.isModerator(message.member)) {
            const rate = {
                guildID: message.guild.id,
                rate: trate,
                specialRate: srate,
            };

            treasureUtils.treasureRate.push(rate);
            message.say('Treasure rate updated');
        }

    }
};
