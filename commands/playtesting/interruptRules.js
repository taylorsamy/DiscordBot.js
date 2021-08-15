const fs = require('fs');
const path = require('path');
const { MessageAttachment } = require('discord.js');
const { Command } = require('discord.js-commando');
const cardMaker = require('../../utils/rozCardMaker');

const allowableGuilds = '517060172628099077';

module.exports = class AdminRolesCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'infocard',
            group: 'playtesting',
            memberName: 'infocard',
            description: 'create RoZ card',
            guildOnly: true,
            ownerOnly: false,


        });
    }

    // noinspection JSCheckFunctionSignatures
    async run(message, { }) {

        if (message.guild.id !== allowableGuilds) {
            return message.say('This command is not available in this guild.');
        }


        const filepath = await cardMaker.generateInfoCard();
        console.log(filepath);


        const image = fs.readFileSync(path.join(filepath));
        const attachment = new MessageAttachment(image);
        return message.say('', attachment);
    }
};
