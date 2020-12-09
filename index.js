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
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('hide and seek!');
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

