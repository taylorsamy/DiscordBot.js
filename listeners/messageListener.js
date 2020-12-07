const db = require('../utils/database');
const treasureHunt = require('../utils/treasureHunt');

const messageListener = async function(message) {
    console.log('list');
    const connection = await db.connection();
    await connection.query('INSERT INTO `Messages` (GuildID, UserID, MessageID) VALUES (' + message.guild.id + ', ' + message.member.id + ',' + message.id + ');');
    connection.release();
    if (treasureHunt.activeHunts.includes(message.guild.id)) {
        console.log('test');
    }

};


module.exports = {
    messageListener: messageListener,
};