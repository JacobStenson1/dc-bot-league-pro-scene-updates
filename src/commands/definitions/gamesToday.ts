import { SlashCommandBuilder } from '@discordjs/builders';

export default new SlashCommandBuilder()
    .setName('games_today')
    .setDescription('Display all games today for a league')
    .addStringOption(option =>
        option.setName('league')
            .setDescription('What league to return games for?')
            .setRequired(true));