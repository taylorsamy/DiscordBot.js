const db = require('../utils/database');
const utils = require('../utils/utils');
const treasureUtils = require('../utils/treasureHunt');
const lodash = require('lodash');

const messageListener = async function(message) {
    if (!message.author.bot) {
        const connection = await db.connection();
        await connection.query('INSERT INTO `Messages` (GuildID, UserID, MessageID) VALUES (' + message.guild.id + ', ' + message.member.id + ',' + message.id + ');');
        connection.release();
        if (treasureUtils.activeHunts.includes(message.guild.id)) {
            const rates = lodash.filter(treasureUtils.treasureRate, x => x.guildID === message.guild.id);

            const num = utils.randomNum(1, rates[0] ? rates[0].rate : 10); // have a 1 in rate chance of spawning treasure. If rate is not set, default to 10
            console.log(num);

            if (num === 1) { // if random num is 1, spawn treasure

                const specialNum = utils.randomNum(1, rates[0] ? rates[0].specialRate : 10);// have a 1 in rate chance of spawning special treasure. If rate is not set, default to 10
                if (specialNum === 1) {
                    // const attachment = new Discord.MessageAttachment('assets/images/closed.png', 'closed.png');
                    // const embed = new Discord.MessageEmbed()
                    //     .setTitle('Special Treasure')
                    // .attachFiles(attachment)
                    //     .setImage('https://media.discordapp.net/attachments/759821937844944937/788204384097271849/closed.png');


                    message.channel.send('https://media.discordapp.net/attachments/759821937844944937/788204384097271849/closed.png').then(msg => {
                        msg.react(msg.client.emojis.cache.find(emoji => emoji.id === treasureUtils.emote));
                        treasureUtils.unclaimedSpecialTreasure.push(msg.id);
                        treasureUtils.unclaimedTreasure.push(msg.id);
                    });

                } else {

                    message.react(message.client.emojis.cache.find(emoji => emoji.id === treasureUtils.emote)); // react to message
                    treasureUtils.unclaimedTreasure.push(message.id); // push to unclaimed treasure for reaction listener
                }

            }
        }
    }


};


module.exports = {
    messageListener: messageListener,
};