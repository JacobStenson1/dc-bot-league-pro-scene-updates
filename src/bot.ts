import { Client, Interaction } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { clientId, TEST_guildId, token } from './config';
import { gamesCommandHandler, leaguesCommandHandler } from './commands/handlers';
import { gamesCommandDefinition, leaguesCommandDefinition } from './commands/definitions';

export default class DiscordBot {
    client;
    rest = new REST({version: '9'}).setToken(token);
    Routes = Routes;
    clientId = clientId;
    guildId = TEST_guildId;

    constructor(client: Client) {
        this.client = client;
        this.setupCommands().then(_ => console.log('Commands setup'));
    }

    onReady() {
        console.log(`Bot running.`);
    }

    async setupCommands() {
        const commands = [
            gamesCommandDefinition,
            leaguesCommandDefinition
        ].map(command => command.toJSON());

        await this.rest.put(
            this.Routes.applicationGuildCommands(this.clientId, this.guildId),
            {body: commands}
        );

        console.log('Successfully reloaded application (/) commands.');
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
                await gamesCommandHandler(interaction)
                break;
        }

        console.log('Interaction entered');

        return;
    }
};