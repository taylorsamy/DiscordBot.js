const db = require('./database');

const getTreasure = async function(guildID, userID) {

    const connection = await db.connection();
    const result = await connection.query('SELECT * FROM TreasureHunt WHERE GuildId = ' + guildID + ' AND ID = ' + userID + ';');
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
        return result[0].Treasure;

    } else {
        await connection.query('INSERT INTO TreasureHunt (GuildID, ID, Treasure) VALUES (' + guildID + ', ' + userID + ', ' + numTreasure + ');');
        const result = await connection.query('SELECT * FROM TreasureHunt WHERE GuildId = ' + guildID + ' AND ID = ' + userID + ';');
        return result[0].Treasure;
    }

};

module.exports = {
    getTreasure: getTreasure,
    giveTreasure: giveTreasure,
};

