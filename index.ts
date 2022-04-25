import { Client, Intents } from 'discord.js';
import { token } from './src/config';
import DiscordBot from './src/bot';

const client = new Client({intents: [Intents.FLAGS.GUILD_MESSAGES]});

const dcBot = new DiscordBot(client);

client.once('ready', dcBot.onReady);

// When someone enters a command
client.on('interactionCreate', dcBot.onInteraction);

client.login(token);

export default client;