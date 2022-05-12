import { Client, Interaction } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { gamesCommandDefinition, gamesTodayCommandDefinition, leaguesCommandDefinition } from './commands/definitions';
import { gamesCommandHandler, leaguesCommandHandler } from './commands/handlers';
import { clientId, guildId, IS_DEV, token } from './config';

export default class DiscordBot {
    client;
    rest = new REST({version: '9'}).setToken(token);
    Routes = Routes;
    clientId = clientId;
    guildId = guildId;

    constructor(client: Client) {
        this.client = client;
        this.setupCommands().then(_ => console.log('Commands setup'));
    }

    onReady() {
        console.log(`Bot running.`);
    }

    async setupCommands() {
        console.log('Setting up commands');

        const commands = [
            gamesCommandDefinition,
            leaguesCommandDefinition,
            gamesTodayCommandDefinition
        ].map(command => command.toJSON());

        if (IS_DEV) {
            await this.rest.put(
                this.Routes.applicationGuildCommands(this.clientId, this.guildId),
                {body: commands}
            );
            console.log('Successfully reloaded Guild (/) commands.');

        } else {
            await this.rest.put(
                this.Routes.applicationCommands(this.clientId),
                {body: commands}
            );
            console.log('Successfully reloaded Global (/) commands.');
        }
    }

    async onInteraction(interaction: Interaction) {
        // If interaction is not a command then ignore
        if (!interaction.isCommand()) return;

        await interaction.deferReply();

        switch (interaction.commandName) {
            case 'leagues':
                await leaguesCommandHandler(interaction);
                break;
            case 'games':
                await gamesCommandHandler(interaction);
                break;
        }

        console.log('Interaction entered');

        return;
    }
};