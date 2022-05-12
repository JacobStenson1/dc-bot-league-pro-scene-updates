import * as dotenv from 'dotenv';

dotenv.config();

import { Client, Intents } from 'discord.js';
import DiscordBot from './src/bot';
import { token } from './src/config';
import express, { Request, Response } from 'express';

// Setup express server so Heroku does not think the node process has crashed
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.urlencoded({extended: true}));
app.use('/', (_: Request, response: Response) => response.sendStatus(200));

const client = new Client({intents: [Intents.FLAGS.GUILD_MESSAGES]});

const dcBot = new DiscordBot(client);

client.once('ready', dcBot.onReady);

// When someone enters a command
client.on('interactionCreate', dcBot.onInteraction);

client.login(token);

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));

export default client;