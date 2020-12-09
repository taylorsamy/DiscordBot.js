const db = require('../utils/database');
const utils = require('../utils/utils');
const treasureHunt = require('../utils/treasureHunt');

const messageListener = async function(message) {
    if (!message.author.bot) {
        const connection = await db.connection();
        await connection.query('INSERT INTO `Messages` (GuildID, UserID, MessageID) VALUES (' + message.guild.id + ', ' + message.member.id + ',' + message.id + ');');
        connection.release();
        if (treasureHunt.activeHunts.includes(message.guild.id)) {

            const num = utils.randomNum(1, 2);
            console.log(num);

            if (num === 1) {
                message.react(message.client.emojis.cache.find(emoji => emoji.id === treasureHunt.emote));
                const guildMessage = {
                    guild: message.guild.id, message: message.id,
                };
                treasureHunt.unclaimedTreasure.push(guildMessage);
                console.log(treasureHunt.unclaimedTreasure);
            }


            // treasureHunt.unclaimedTreasure.push();

        }
    }


};


module.exports = {
    messageListener: messageListener,
};