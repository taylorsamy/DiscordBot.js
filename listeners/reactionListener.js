const treasureUtils = require('../utils/treasureHunt');


const reactionListener = async function(messageReaction, user) {
    if (!user.bot) {
        // messageReaction.message.channel.send('test ' + user.tag).then(message => {
        //     message.react(messageReaction.emoji);
        // if the message being reacted to has unclaimed treasure AND the reaction emoji is the treasure emoji
        if(treasureUtils.unclaimedTreasure.includes(messageReaction.message.id) && messageReaction.emoji.id === treasureUtils.emote) {
            // TODO calculate amount of treasure to give based on current treasure and activity
            // Delete the entry from the unclaimedTreasure
            treasureUtils.unclaimedTreasure.splice(treasureUtils.unclaimedTreasure.indexOf(messageReaction.message.id), 1);
            // give the user treasure


            if (treasureUtils.unclaimedSpecialTreasure.includes(messageReaction.message.id) && messageReaction.emoji.id === treasureUtils.emote) {
                // const attachment = new Discord.MessageAttachment('assets/images/gems.png', 'gems.png');
                // const embed = new Discord.MessageEmbed();
                // .setTitle(user.tag + ' has found the Special Treasure')
                // .attachFiles(attachment)
                // .setImage('https://cdn.discordapp.com/attachments/759821937844944937/788212108638027776/gems.png');

                messageReaction.message.edit('https://cdn.discordapp.com/attachments/759821937844944937/788212108638027776/gems.png');
                const treasure = await treasureUtils.giveTreasure(messageReaction.message.guild.id, user.id, 5);
                messageReaction.message.reactions.cache.get(treasureUtils.emote).remove();
                messageReaction.message.channel.send(user.tag + ' has found the treasure and now has ' + treasure);
            } else {

                const treasure = await treasureUtils.giveTreasure(messageReaction.message.guild.id, user.id, 1);
                messageReaction.message.reactions.cache.get(treasureUtils.emote).remove();
                messageReaction.message.channel.send(user.tag + ' has found the treasure and now has ' + treasure);
            }
            // remove the reaction


        }

    }
};

module.exports = {
    reactionListener: reactionListener,
};