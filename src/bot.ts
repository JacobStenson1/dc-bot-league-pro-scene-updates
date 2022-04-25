import { Client, Interaction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { clientId, TEST_guildId, token } from './config';
import editInteractionReply from './utils/functions/editInteractionReply';
import leagues from './utils/api/leagues';

export default class DiscordBot {
    client;
    SlashCommandBuilder = SlashCommandBuilder;
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
            new this.SlashCommandBuilder()
                .setName('games')
                .setDescription('Returns all the current league games')
                .addStringOption(option =>
                    option.setName('league')
                        .setDescription('What league?')
                        .setRequired(false)),
            new this.SlashCommandBuilder()
                .setName('leagues')
                .setDescription('Return all leagues')
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

        if (interaction.commandName === 'leagues') {

            const allLeagues = await leagues();

            console.log('allGames');
            console.log(allLeagues);

            allLeagues.data.leagues.length = 5;

            await editInteractionReply(interaction, JSON.stringify(allLeagues.data.leagues));
        }

        console.log('Interaction entered');
    }
};