const { poolPromise } = require('./database');

const query = async function(sqlQuery) {
    try {
        const connection = await poolPromise;
        const result = await connection.request().query(sqlQuery);
        return result;
        // connection.release();
    } catch (err) {
        console.log(err);
    }
};


const isModerator = async function(member) {
    try {
        const connection = await poolPromise;
        const config = await connection.request().query('SELECT * FROM guilds WHERE id = ' + member.guild.id);
        // connection.release();
        return member.roles.cache.has(config.recordset[0].moderatorRole) || isAdministrator(member);
    } catch (err) {
        console.log(err);
    }
};

const isAdministrator = async function(member) {
    try {
        const connection = await poolPromise;
        const config = await connection.request().query('SELECT * FROM guilds WHERE id = ' + member.guild.id);
        //  connection.release();
        return member.roles.cache.has(config.recordset[0].adminRole);
    } catch (err) {
        console.log(err);
    }
};

const createGuild = async function(guild) {
    try{
        const connection = await poolPromise;
        connection.request().query('INSERT INTO Guilds (id, prefix, name) VALUES (' + guild.id + ', \'!\', \'' + guild.name + '\');');
        connection.request().query('INSERT INTO Moderation (guildID) VALUES (' + guild.id + ');');
        // connection.release();
    } catch (err) {
        console.log(err);
    }
};

const updateAdminRoles = async function(guild, moderator, admin) {
    try{
        const connection = await poolPromise;
        connection.request().query('UPDATE guilds SET moderatorRole = ' + moderator.id + ',adminRole = ' + admin.id + ' WHERE id = ' + guild.id + ';');
    } catch (err) {
        console.log(err);
    }
};

const randomNum = function(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min,
    );
};

module.exports = {
    isModerator: isModerator,
    isAdministrator: isAdministrator,
    createGuild: createGuild,
    updateAdminRoles: updateAdminRoles,
    randomNum: randomNum,
    query: query,
};