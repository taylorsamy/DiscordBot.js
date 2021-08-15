const { poolPromise } = require('../utils/database');
const utils = require('../utils/utils');
const treasureUtils = require('../utils/treasureHunt');
const lodash = require('lodash');

const messageListener = async function(message) {
    if (!message.author.bot) {

        // update/add user to members table
        try {
            const db = await poolPromise;
            const result = await db.request()
                .query('IF NOT EXISTS (SELECT * FROM Members \n' +
                    'WHERE GuildID = \'' + message.guild.id + '\' \n' +
                    'AND UserID = \'' + message.member.id + '\'\n' +
                    ') INSERT INTO Members (GuildID, UserID, UserName, DisplayName)\n' +
                    'VALUES (\'' + message.guild.id + '\', \'' + message.member.id + '\', \'' + message.member.user.username + '\', \'' + message.member.displayName + '\')\n' +
                    'ELSE IF NOT EXISTS (SELECT * FROM Members \n' +
                    'WHERE GuildID = \'' + message.guild.id + '\' \n' +
                    'AND UserID = \'' + message.member.id + '\'\n' +
                    'AND UserName = \'Taylor\'\n' +
                    'AND DisplayName = \'Dwaggy\')\n' +
                    'UPDATE Members SET UserName = \'' + message.member.user.username + '\', DisplayName = \'' + message.member.displayName + '\' \n' +
                    'WHERE GuildID = \'' + message.guild.id + '\' AND UserID = \'' + message.member.id + '\'');
        } catch (err) {
            console.log(err);
        }
        // keep track of bites, nips, growls
        if (message.content.includes('nips') || message.content.includes('bites') || message.content.includes('growls')
        || message.content.includes('chomps') || message.content.includes('ch0mps')) {
            console.log(message.content);
            try {
                const db = await poolPromise;
                const result = await db.request()
                    .query('INSERT INTO PuppyActions (GuildID, UserID, MessageID, MessageContent) VALUES ' +
                        '(' + message.guild.id + ', ' + message.member.id + ',' + message.id + ',\'' + message.content + '\');');
            } catch (err) {
                console.log(err);
            }

        }
        // insert record into messages table
        try {
            const db = await poolPromise;
            const result = await db.request()
                .query('INSERT INTO Messages (GuildID, UserID, MessageID) VALUES (' + message.guild.id + ', ' + message.member.id + ',' + message.id + ');');
        } catch (err) {
            console.log(err);
        }


        // if (treasureUtils.activeHunts.includes(message.guild.id)) {
        //     const rates = lodash.filter(treasureUtils.treasureRate, x => x.guildID === message.guild.id);
        //
        //     const num = utils.randomNum(1, rates[0] ? rates[0].rate : 10); // have a 1 in rate chance of spawning treasure. If rate is not set, default to 10
        //     console.log(num);
        //
        //     if (num === 1) { // if random num is 1, spawn treasure
        //
        //         const specialNum = utils.randomNum(1, rates[0] ? rates[0].specialRate : 10);// have a 1 in rate chance of spawning special treasure. If rate is not set, default to 10
        //         if (specialNum === 1) {
        //             // const attachment = new Discord.MessageAttachment('assets/images/closed.png', 'closed.png');
        //             // const embed = new Discord.MessageEmbed()
        //             //     .setTitle('Special Treasure')
        //             // .attachFiles(attachment)
        //             //     .setImage('https://media.discordapp.net/attachments/759821937844944937/788204384097271849/closed.png');
        //
        //
        //             message.channel.send('https://media.discordapp.net/attachments/759821937844944937/788204384097271849/closed.png').then(msg => {
        //                 msg.react(msg.client.emojis.cache.find(emoji => emoji.id === treasureUtils.emote));
        //                 treasureUtils.unclaimedSpecialTreasure.push(msg.id);
        //                 treasureUtils.unclaimedTreasure.push(msg.id);
        //             });
        //
        //         } else {
        //
        //             message.react(message.client.emojis.cache.find(emoji => emoji.id === treasureUtils.emote)); // react to message
        //             treasureUtils.unclaimedTreasure.push(message.id); // push to unclaimed treasure for reaction listener
        //         }
        //
        //     }
        // }
    }


};


module.exports = {
    messageListener: messageListener,
};