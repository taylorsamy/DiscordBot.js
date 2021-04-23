const { CommandoClient } = require('discord.js-commando');
const path = require('path');


const { token, prefix } = require('./config.json');
const utils = require('./utils/utils');
const msgListener = require('./listeners/messageListener');
const reactListener = require('./listeners/reactionListener');

const client = new CommandoClient({
    commandPrefix: prefix,
    owner: '127899667584385024',
    unknownCommandResponse: false,
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['admin', 'administrative commands'],
        ['treasure', 'Treasure Hunt Commands'],
        ['test', 'test commands'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('hide and seek!');

    setTimeout(function() { // in leftToEight() milliseconds run this:
        sendMessage(); // send the message once
        const dayMillseconds = 1000 * 60 * 60 * 24 * 7;
        setInterval(function() { // repeat this every week
            sendMessage();
        }, dayMillseconds);
    }, leftToFive());

});

client.on('guildCreate', (guild) => {
    utils.createGuild(guild);
});

client.on('message', message=> {
    msgListener.messageListener(message);

});

client.on('messageReactionAdd', (message, user) => {
    reactListener.reactionListener(message, user);
});

client.on('error', console.error);

client.login(token);

function leftToFive() {
    const d = new Date();
    return (-d + d.setHours(5, 0, 0, 0));
}

function sendMessage() {
    const mruTuitionAction = client.guilds.cache.find(guild => guild.id === '825823152436543518');
    const date = new Date(Date.now());
    mruTuitionAction.channels.cache.find(channel => channel.id === '828379019086004236')
        .send('As of ' +
            date.toLocaleString('en-US', { timeZone: 'America/Edmonton' })
            + ' there are ' + mruTuitionAction.memberCount + ' members in this server');


}