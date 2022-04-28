import { SlashCommandBuilder } from '@discordjs/builders';

export default new SlashCommandBuilder()
    .setName('games')
    .setDescription('Returns all the current league games')
    .addStringOption(option =>
        option.setName('league')
            .setDescription('What league?')
            .setRequired(false))