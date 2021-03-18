import * as discord from 'discord.js';
import * as dotenv from 'dotenv';
import * as msganalyzer from './message_analyzer';

const client = new discord.Client();

dotenv.config();

client.once('ready', () => {
    console.log(client.user.username + ' is online!');
});

client.on('message', (message) => {
    // ignoruj správy od botov, inak by mohol nastať infinite loop
    if (!message.author.bot) {
        // prečítaj obsah správy
        let response: string = msganalyzer.read(message.content);

        // ak sa v správe nachádza keyword, odpíš autorovi s odkazom na potenciálnu odpoveď k dotazu
        if (response) {
            message.channel.send('Ahoj ' + message.author.toString() + ', ' + response + '.');
        }
    }
});

client.login(process.env.BOT_TOKEN);
