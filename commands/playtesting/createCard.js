const fs = require('fs');
const path = require('path');
const { MessageAttachment } = require('discord.js');
const { Command } = require('discord.js-commando');
const cardMaker = require('../../utils/rozCardMaker');
module.exports = class AdminRolesCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'createcard',
            group: 'playtesting',
            memberName: 'createcard',
            description: 'create RoZ card',
            guildOnly: true,
            ownerOnly: true,
            args: [
                {
                    key: 'name',
                    prompt: 'Please enter the card name',
                    type: 'string',
                },
                {
                    key: 'type',
                    prompt: 'Please enter the card type. Eg. "Action (ongoing)"',
                    type: 'string',
                },
                {
                    key: 'flavour',
                    prompt: 'Please enter the flavour text',
                    type: 'string',
                },
                {
                    key: 'effect',
                    prompt: 'Please enter the card effect text',
                    type: 'string',
                },
                {
                    key: 'colour',
                    prompt: 'Please enter the card colour. Eg. "red"',
                    type: 'string',
                },
                {
                    key: 'boost',
                    prompt: 'Can the card be boosted? (true/false)',
                    type: 'boolean',
                },
                {
                    key: 'reserve',
                    prompt: 'Can the card be reserved? (true/false)',
                    type: 'boolean',
                },
                {
                    key: 'share',
                    prompt: 'Can the card be shared? (true/false)',
                    type: 'boolean',
                },

            ],
        });
    }

    // noinspection JSCheckFunctionSignatures
    async run(message, { name, flavour, type, effect, colour, boost, reserve, share }) {
        const filepath = await cardMaker.generateImage(name, flavour, type, effect, colour, boost, reserve, share, Date.now());
        console.log(filepath);

        const image = fs.readFileSync(path.join(filepath));
        const attachment = new MessageAttachment(image);
        return message.reply(name + ' has been born!', attachment);
    }
};
