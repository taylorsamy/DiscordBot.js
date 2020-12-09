const treasureHunt = require('../utils/treasureHunt');

const reactionListener = function(messageReaction, user) {
    if (!user.bot) {
        messageReaction.message.channel.send('test ' + user.tag).then(message => {
            message.react(messageReaction.emoji);
        });
    }
};

module.exports = {
    reactionListener: reactionListener,
};