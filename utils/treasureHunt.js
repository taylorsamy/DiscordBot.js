const db = require('./database');

const getTreasure = async function(guildID, userID) {

    const connection = await db.connection();
    const result = await connection.query('SELECT * FROM TreasureHunt WHERE GuildId = ' + guildID + ' AND ID = ' + userID + ';');
    connection.release();
    if (Object.keys(result).length) {
        return result[0].Treasure;
    } else {
        return -1;
    }
};

const giveTreasure = async function(guildID, userID, numTreasure) {
    const connection = await db.connection();
    const treasure = await getTreasure(guildID, userID);
    if (!(treasure === -1)) {
        const totalTreasure = parseInt(treasure) + parseInt(numTreasure);
        await connection.query('UPDATE `TreasureHunt` SET `Treasure` = ' + totalTreasure + ' WHERE `GuildID` = ' + guildID + ' AND `ID` = ' + userID + ';');
        const result = await connection.query('SELECT * FROM TreasureHunt WHERE GuildId = ' + guildID + ' AND ID = ' + userID + ';');
        connection.release();
        return result[0].Treasure;

    } else {
        await connection.query('INSERT INTO TreasureHunt (GuildID, ID, Treasure) VALUES (' + guildID + ', ' + userID + ', ' + numTreasure + ');');
        const result = await connection.query('SELECT * FROM TreasureHunt WHERE GuildId = ' + guildID + ' AND ID = ' + userID + ';');
        connection.release();
        return result[0].Treasure;
    }
};

const activeHunts = [];
const unclaimedTreasure = [];

const emote = '708833760488980540';


module.exports = {
    getTreasure: getTreasure,
    giveTreasure: giveTreasure,
    activeHunts: activeHunts,
    unclaimedTreasure: unclaimedTreasure,
    emote: emote,
};

