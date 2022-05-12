import { SlashCommandBuilder } from '@discordjs/builders';
import { TODAY, TOMORROW } from '../../constants/commands/games';

export default new SlashCommandBuilder()
    .setName('games')
    .setDescription('Returns all the current league games')
    .addStringOption(option =>
        option.setName('league_id')
            .setDescription('Provide the league ID to return games for')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('day_to_return')
            .setDescription('Would you like to see games for today or tomorrow. Enter \'today\' or \'tomorrow\'')
            .setRequired(true)
            .addChoice('Today', TODAY)
            .addChoice('Tomorrow', TOMORROW));