const db = require('./database');


const isModerator = async function(member) {
    const connection = await db.connection();
    const config = await connection.query('SELECT * FROM guilds WHERE id = ' + member.guild.id);
    connection.release();
    return member.roles.cache.has(config[0].moderatorRole);
};

const isAdministrator = async function(member) {
    const connection = await db.connection();
    const config = await connection.query('SELECT * FROM guilds WHERE id = ' + member.guild.id);
    connection.release();
    return member.roles.cache.has(config[0].adminRole);
};

const createGuild = async function(guild) {
    const connection = await db.connection();
    connection.query('INSERT INTO guilds (id, prefix, name) VALUES (' + guild.id + ', "!", "' + guild.name + '");');
    connection.release();
};

const updateAdminRoles = async function(guild, moderator, admin) {
    const connection = await db.connection();
    connection.query('UPDATE `guilds` SET `moderatorRole` = ' + moderator.id + ',`adminRole` = ' + admin.id + ' WHERE id = ' + guild.id + ';');
    connection.release();
};

module.exports = {
    isModerator: isModerator,
    isAdministrator: isAdministrator,
    createGuild: createGuild,
    updateAdminRoles: updateAdminRoles,
};