const { poolPromise } = require('../utils/database');

const getTreasure = async function(guildID, userID) {
    try {
        const connection = poolPromise;

        const result = await connection.request().query('SELECT * FROM TreasureHunt WHERE GuildId = ' + guildID + ' AND ID = ' + userID + ';');
        // connection.close();
        if (Object.keys(result).length) {
            return result[0].Treasure;
        } else {
            return -1;
        }
    } catch (err) {
        console.log(err);
    }
};

const giveTreasure = async function(guildID, userID, numTreasure) {
    try {
        const connection = poolPromise;
        const treasure = await getTreasure(guildID, userID);
        if (!(treasure === -1)) {
            const totalTreasure = parseInt(treasure) + parseInt(numTreasure);
            await connection.request().query('UPDATE TreasureHunt SET Treasure = ' + totalTreasure + ' WHERE GuildID = ' + guildID + ' AND ID = ' + userID + ';');
            const result = await connection.request().query('SELECT * FROM TreasureHunt WHERE GuildId = ' + guildID + ' AND ID = ' + userID + ';');

            return result[0].Treasure;

        } else {
            await connection.query('INSERT INTO TreasureHunt (GuildID, ID, Treasure) VALUES (' + guildID + ', ' + userID + ', ' + numTreasure + ');');
            const result = await connection.query('SELECT * FROM TreasureHunt WHERE GuildId = ' + guildID + ' AND ID = ' + userID + ';');
            connection.release();
            return result[0].Treasure;
        }
    } catch (err) {
        console.log(err);
    }
};

const activeHunts = [];
const unclaimedTreasure = [];
const unclaimedSpecialTreasure = [];
const emote = '787452733556391977';
const treasureRate = [];


module.exports = {
    getTreasure: getTreasure,
    giveTreasure: giveTreasure,
    activeHunts: activeHunts,
    unclaimedTreasure: unclaimedTreasure,
    emote: emote,
    treasureRate: treasureRate,
    unclaimedSpecialTreasure: unclaimedSpecialTreasure,
};

