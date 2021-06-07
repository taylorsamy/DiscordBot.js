// const fs = require('fs');
// const path = require('path');
// const { MessageAttachment } = require('discord.js');
// const { Command } = require('discord.js-commando');
// const cardMaker = require('../../utils/rozCardMaker');
// module.exports = class AdminRolesCommand extends Command {
//     constructor(client) {
//         super(client, {
//             name: 'test',
//             group: 'admin',
//             memberName: 'test',
//             description: 'create RoZ card',
//             guildOnly: true,
//             ownerOnly: true,
//             args: [
//                 {
//                     key: 'details',
//                     prompt: 'Please enter card details in this format. IconURL is optional.: "name;type;flavour;effect;colour;boost;reserve;share;iconURL"',
//                     type: 'string',
//                     wait: 500,
//                 },
//
//             ],
//         });
//     }
//
//     // noinspection JSCheckFunctionSignatures
//     async run(message, { details }) {
//         const cardDeets = details.replace(/(\r\n|\n|\r)/gm, '').split(';');
//
//         if (cardDeets.length < 8) {
//             return message.say('You\'re missing some arguments. ALl the fields are required. name;type;flavour;effect;colour;boost;reserve;share ');
//         }
//
//         const name = cardDeets[0];
//         const type = cardDeets[1];
//         const flavour = cardDeets[2];
//         const effect = cardDeets[3];
//         let colour = cardDeets[4];
//         let boost = cardDeets[5];
//         let reserve = cardDeets[6];
//         let share = cardDeets[7];
//         let iconURL = 'https://i.imgur.com/3KUkKHh.png';
//
//         if (cardDeets.length === 9) {
//             iconURL = cardDeets[8];
//         }
//
//
//         colour = (colour.toLowerCase() === 'action') ? '#e61920' : colour;
//         colour = (colour.toLowerCase() === 'reaction') ? '#3684c9' : colour;
//         colour = (colour.toLowerCase() === 'modifier') ? '#f9b411' : colour;
//         colour = (colour.toLowerCase() === 'promo') ? '#e31482' : colour;
//
//         reserve = reserve === 'yes' ? 'block' : 'none';
//         boost = boost === 'yes' ? 'block' : 'none';
//         share = share === 'yes' ? 'block' : 'none';
//
//
//         const filepath = await cardMaker.generateImage(name, flavour, type, effect, colour, boost, reserve, share, iconURL, Date.now());
//         console.log(filepath);
//
//
//         const image = fs.readFileSync(path.join(filepath));
//         const attachment = new MessageAttachment(image);
//         return message.reply(name + ' has been born!', attachment);
//     }
// };
