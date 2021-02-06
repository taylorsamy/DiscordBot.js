const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const db = require('../../utils/database');
module.exports = class CandyShopLevelUp extends Command {
    constructor(client) {
        super(client, {
            name: 'candyshoplevelup',
            group: 'admin',
            memberName: 'admin',
            description: 'Gets the users ready to be leveled up to CandyShop',
            guildOnly: true,
        });
    }

    // noinspection JSCheckFunctionSignatures    645240133741707274 <- candycandidate
    async run(message) {

        const connection = await db.connection();
        const users = await getUsers(message);
        const candidates = [];

        for (const user of users) {

            const numMessages = await connection.query('SELECT COUNT(*) AS NumMessages FROM Messages WHERE UserID = ' + user.user.id + ';');
            const lastMessage = await connection.query('SELECT MAX(Date) AS MaxDate FROM Messages WHERE UserID = ' + user.user.id + ';');

            const candidate = {
                user: user,
                numMessages: numMessages[0].NumMessages,
                lastMessage: lastMessage[0].MaxDate,
            };

            candidates.push(candidate);


        }
        // console.log(candidates);
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('CandyCandidate Report')
            .setAuthor('Taylor');

        candidates.forEach(value => {
            embed.addField(value.user.user.tag, 'Number of messages: ' + value.numMessages + ' \nDate of last message: ' + value.lastMessage);
        });

        message.channel.send(embed);

    }
};


const getUsers = (message) => {
    return new Promise(((resolve, reject) => {
        setTimeout(() => {
            reject();
        }, 5000);
        message.guild.roles.fetch('645240133741707274', false, true).then(value => {
            resolve(value.members.map(m => m));
        });

    }));

};

