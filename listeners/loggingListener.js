const utils = require('../utils/utils');
const Discord = require('discord.js');

const memberJoin = async function(member) {

    const result = await utils.query('SELECT * FROM Moderation WHERE guildID = ' + member.guild.id);
    // noinspection JSUnresolvedVariable
    if (result.recordset[0].memberLogChannel) {
        // noinspection JSCheckFunctionSignatures
        const embed = new Discord.MessageEmbed()
            .setTitle('Member Joined')
            .setThumbnail(member.user.avatarURL())
            .addFields(
                { name: 'User', value : member.displayName + '\n' + member.user.tag + '\n' + member.id, inline: true },
                { name: 'Account Created', value : member.user.createdAt, inline: true },
                { name: 'Joined On', value : member.joinedAt, inline: true },
            );
        // noinspection JSUnresolvedVariable
        member.guild.channels.cache.get(result.recordset[0].memberLogChannel).send(embed);
    }

};
const memberLeave = async function(member) {

    const result = await utils.query('SELECT * FROM Moderation WHERE guildID = ' + member.guild.id);
    const leaveDate = new Date(Date.now()).toLocaleString('en-US', { timeZone: 'America/Edmonton' });
    // noinspection JSUnresolvedVariable
    if (result.recordset[0].memberLogChannel) {
        // noinspection JSCheckFunctionSignatures
        const embed = new Discord.MessageEmbed()
            .setTitle('Member Left')
            .setThumbnail(member.user.avatarURL())
            .addFields(
                { name: 'User', value : member.displayName + '\n' + member.user.tag + '\n' + member.id, inline: true },
                { name: 'Account Created', value : member.user.createdAt, inline: true },
                { name: 'Left On', value : leaveDate, inline: true },
            );
        // noinspection JSUnresolvedVariable
        member.guild.channels.cache.get(result.recordset[0].memberLogChannel).send(embed);
    }

};

module.exports = {
    memberJoin: memberJoin,
    memberLeave: memberLeave,
};